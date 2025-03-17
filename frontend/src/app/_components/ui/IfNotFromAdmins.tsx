"use client";
import { userRoles } from "@/app/constant/userRoles";
import useUserSelector from "@/app/hooks/AppSelectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const IfNotFromAdmins = () => {
  const router = useRouter();
  const userLogin = useUserSelector();

  useEffect(() => {
    const role = userLogin?.user?.role;
    if (
      userLogin &&
      userLogin.isAuthenticated &&
      ![userRoles.ADMIN, userRoles.SUPERADMIN, userRoles.LEADER].includes(
        role || "USER"
      )
    ) {
      Swal.fire({
        title: "Access Denied",
        text: "You don't have permission to access this page.",
        icon: "error",
        confirmButtonText: "OK",
        timer: 5000,
        draggable: false,
        timerProgressBar: true,
      }).then(() => {
        router.replace("/login");
      });
    }
  }, [userLogin, router]);

  return null;
};

export default IfNotFromAdmins;
