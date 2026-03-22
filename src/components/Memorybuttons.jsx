import React, { useState } from "react";
import "./MemoryButtons.css";

const MemoryButton = ({
  value,
  isActive,
  onClick,
  isMatched,
  ComponentSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isFlipped = isActive || isMatched;

  return (
    <div
      className="MemoryButton"
      style={{
        backgroundColor: isActive
          ? "#FDA214"
          : isMatched
          ? "#BCCED9"
          : isHovered
          ? "#617a8b"
          : "#304859",
        transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!isMatched ? onClick : () => {}}
    >
      {isFlipped &&
        (typeof value === "number" ? (
          <h1
            style={{
              color: "var(--white)",
              fontSize: ComponentSize,
              transform: `scaleX(-1)`,
            }}
          >
            {value}
          </h1>
        ) : (
          <img
            src={value}
            alt="icon"
            style={{
              width: ComponentSize,
              height: ComponentSize,
              transform: `scaleX(-1)`,
            }}
          />
        ))}
    </div>
  );
};

export default MemoryButton;