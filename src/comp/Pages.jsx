import React, { useState } from "react";

function Pages() {
  const [zIndex, setZIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [height, setHeight] = useState(12.5);

  return (
    <div>
      <div
        className={`absolute bg-green-300 aspect-square z-[var(--z-index)] 
          top-[var(--position)] h-[var(--height)] left-0 w-[10rem]`}
        style={{
          "--z-index": `${zIndex}`,
          "--position": `${position}rem`,
          "--height": `${height}rem`,
        }}
      >
        asd
      </div>
    </div>
  );
}

export default Pages;
