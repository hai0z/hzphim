import React from "react";

function ShadowImg() {
  return (
    <div className="absolute left-0 bottom-0 right-0 z-0 top-0">
      <div className="h-full bg-gradient-to-b  from-transparent to-[var(--color-base-100)]"></div>
    </div>
  );
}

export default ShadowImg;
