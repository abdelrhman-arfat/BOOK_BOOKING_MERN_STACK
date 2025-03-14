import React from "react";

const Loader = () => {
  return (
    <div className="absolute bg-black/40 top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div className="loader" />
    </div>
  );
};

export default Loader;
