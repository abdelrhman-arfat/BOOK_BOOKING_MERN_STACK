import { User } from "../db/user.schema.js";
import { ObjectId } from "mongodb";
import {
  createAccessToken,
  createRefreshToken,
} from "../middleware/createWebToken.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRoles } from "../utils/userRole.js";
import { validationResult } from "express-validator";
import { sendVerificationEmail } from "../func/sendVerificationEmail.js";
// import { validationResult } from "express-validator";

const getAllUsers = async (req, res, next) => {
  const { page = 1, limit = 15 } = req.query || req.params;

  const skip = (page - 1) * limit;

  const [Users, totalUsers] = await Promise.all([
    User.find({}).select("-password -__v").limit(limit).skip(skip),
    User.countDocuments(),
  ]);

  if (!Users) {
    next(
      createError({ error: null, message: "No users found", statusCode: 404 })
    );
    return;
  }

  res.status(200).json({
    message: "Users fetched successfully",
    data: {
      Users,
    },
    totalUsers,
    currentPage: +page,
    totalPages: Math.ceil(totalUsers / limit),
    error: null,
  });
};

const handleNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, confirmPassword, password, role } =
      req.body;

    if ((!firstName || !lastName || !email || !password, !confirmPassword)) {
      next(
        createError({ message: "All fields are required", statusCode: 400 })
      );
      return;
    }

    if (password !== confirmPassword) {
      return next(createError({ message: "invalid data", statusCode: 400 }));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    // ignore sensitive and unimportant data
    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.__v;

    await sendVerificationEmail(userResponse);

    const token = await createAccessToken(
      {
        email: userResponse.email,
        role: userResponse.role,
        _id: userResponse._id,
      },
      next
    );

    const refreshToken = await createRefreshToken(
      {
        email: userResponse.email,
        role: userResponse.role,
        _id: userResponse._id,
      },
      next
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/", // when make tokens more sensitive about routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 * 24hours = 7days
    });

    res.cookie("token", token, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/", // when make tokens more sensitive about routes
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.status(200).json({
      message: "user Sign up successfully",
      data: {
        user: userResponse,
      },
      error: null,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This Email is already in use",
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error,
      data: null,
    });
  }
};

const verificationEmail = async (req, res, next) => {
  const { token } = req.query;
  // eslint-disable-next-line no-undef
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findByIdAndUpdate(decoded.userId, {
    isVerified: true,
  });

  if (!user) {
    return next(createError({ message: "user not found", statusCode: 404 }));
  }

  await user.save();

  res.status(200).json({ message: "Email verified! You can now log in." });
};
// when login or when refresh token expired
const handleLogin = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      createError({
        message: error.array()[0].msg,
        statusCode: 400,
        error: error.array(),
      })
    );
  }

  const { email, password } = req.body;
  if (!email || !password) {
    next(createError({ message: "All fields are required", statusCode: 400 }));
    return;
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = await createAccessToken(
    {
      email: user.email,
      _id: user._id,
      role: user.role,
      isVerified: user.isVerified,
    },
    next
  );

  const refreshToken = await createRefreshToken(
    {
      email: user.email,
      _id: user._id,
      role: user.role,
      isVerified: user.isVerified,
    },
    next
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 * 24hours = 7days
  });

  res.cookie("token", token, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  const userResponse = user.toObject();

  delete userResponse.password;

  delete userResponse.__v;

  return res
    .status(200)
    .json({ user: userResponse, success: true, message: "Login successful" });
};

const handleLogOut = (req, res) => {
  // clear cookies in the perv middleware in user.routes.js
  res.status(200).json({ success: true, message: "Logout successful" });
};

// send when token is expired
const refreshToken = async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) {
    return next(
      createError({
        message: "Refresh token not found, unauthorized",
        error: "Unauthorized tokens",
        statusCode: 401,
      })
    );
  }

  const user = await jwt.verify(
    refreshToken,
    // eslint-disable-next-line no-undef
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!user) {
    return next(
      createError({
        message: "Refresh token not found, unauthorized",
        error: "Unauthorized tokens",
        statusCode: 401,
      })
    );
  }
  const token = await createAccessToken(
    {
      email: user.email,
      role: user.role,
      _id: user._id,
      isVerified: user.isVerified,
    },
    next
  );

  res.cookie("token", token, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1000 * 60 * 15,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 * 24hours = 7days
  });
  res.status(200).json({
    data: {
      user,
    },
    success: true,
    message: "Access token refreshed",
  });
};

const handleDeleteUser = async (req, res, next) => {
  const id = req.params.user_id || req.query.user_id;
  const userReq = req.user;

  if (!id) {
    return next(
      createError({ message: "User ID not provided", statusCode: 400 })
    );
  }

  // Check if ID is a valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return next(createError({ message: "Invalid User ID", statusCode: 400 }));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(createError({ message: "User not found", statusCode: 404 }));
  }

  // delete him self until if the role is admin or super admin or leader
  if (user._id.toString() === userReq._id.toString()) {
    await user.deleteOne();
    return res
      .status(200)
      .json({ message: `User deleted successfully: ${user.email}` });
  }

  // save leader only delete his self
  if (user.role === userRoles.LEADER) {
    return next(
      createError({ message: "Can't delete this user", statusCode: 403 })
    );
  }

  // save user delete user
  if (userReq.role === userRoles.USER) {
    return next(
      createError({ message: "Can't delete this user", statusCode: 403 })
    );
  }

  // save admin only deleted by super admin or leader
  if (
    userReq.role === userRoles.ADMIN &&
    (user.role === userRoles.ADMIN || user.role === userRoles.SUPERADMIN)
  ) {
    return next(
      createError({ message: "Can't delete this user", statusCode: 403 })
    );
  }

  // save superadmin only deleted by Leader
  if (user.role === userRoles.SUPERADMIN && userReq.role !== userRoles.LEADER) {
    return next(
      createError({ message: "Can't delete this user", statusCode: 403 })
    );
  }

  await user.deleteOne();

  return res
    .status(200)
    .json({ message: `User deleted successfully: ${user.email}` });
};

const handleUpdatePhoto = async (req, res, next) => {
  const id = req.params.user_id || req.query.user_id;
  if (!id) {
    return next(
      createError({
        message: "Id not provided",
        statusCode: 400,
        error: "ID Not Provided",
      })
    );
  }

  if (!req.file) {
    return next(
      createError({
        message: "No file provided",
        statusCode: 400,
        error: "No File Provided",
      })
    );
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      profilePicture: req.file.path,
    },
    { new: true }
  );

  if (!user) {
    return next(
      createError({
        message: "User not found",
        statusCode: 404,
        error: "User Not Found",
      })
    );
  }

  res.json({
    message: "Profile photo updated successfully",
    profilePhoto: user.profilePhoto,
  });
};

const handelChangeRole = async (req, res, next) => {
  const userReq = req.user;
  const id = req.params.user_id || req.query.user_id;
  const newRole = req.body.role;
  if (!id) {
    return next(
      createError({ message: "User ID not provided", statusCode: 400 })
    );
  }

  if (!ObjectId.isValid(id)) {
    return next(createError({ message: "Invalid User ID", statusCode: 400 }));
  }

  if (!newRole) {
    return next(createError({ message: "Role not provided", statusCode: 400 }));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(createError({ message: "User not found", statusCode: 404 }));
  }

  if (user._id.toString() === userReq._id.toString()) {
    return next(
      createError({ message: "You can't change your role", statusCode: 403 })
    );
  }

  if (
    user.role === userRoles.SUPERADMIN &&
    userReq.role === userRoles.SUPERADMIN
  ) {
    return next(
      createError({
        message: "Super Admin cannot change another Super Admin's role",
        statusCode: 403,
      })
    );
  }

  if (newRole === userRoles.LEADER && userReq.role !== userRoles.LEADER) {
    return next(
      createError({
        message: "Only leaders can assign the Leader role",
        statusCode: 403,
      })
    );
  }

  user.role = newRole;

  await user.save();

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.__v;

  res.status(200).json({
    message: "Role updated successfully",
    success: true,
    data: {
      user: userResponse,
    },
  });
};

export {
  handleUpdatePhoto,
  getAllUsers,
  handleDeleteUser,
  refreshToken,
  handleLogOut,
  handleLogin,
  handleNewUser,
  verificationEmail,
  handelChangeRole,
};
