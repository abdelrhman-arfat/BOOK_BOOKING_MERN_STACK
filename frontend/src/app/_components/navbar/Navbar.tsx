import React from "react";

const Navbar = () => {
  return (
    <header className="w-screen h-[90px] ">
      <nav className="w-[90%] h-full flex items-center justify-between mx-auto ">
        <h1>logo</h1>
        <ul className="flex justify-between items-center gap-6">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
