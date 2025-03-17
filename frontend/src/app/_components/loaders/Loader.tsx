import React from "react";

const Loader = () => {
  return (
    <div className="fixed  right-0 z-[2000000000] bg-black/40 top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div className="loader" />
    </div>
  );
};

export default Loader;
