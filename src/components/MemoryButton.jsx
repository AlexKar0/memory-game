import React, { useState } from "react";
import "./MemoryButton.css";

const MemoryButton = ({
  value,
  isActive,
  onClick,
  isMatched,
  ComponentSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isFlipped = isActive || isMatched;


  const isText =
    typeof value === "number" ||
    (typeof value === "string" && value.length === 1);

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
      onClick={(e) => {
        e.preventDefault();        
        e.stopPropagation();       
        if (!isMatched) onClick();
      }}
    >
      {isFlipped &&
        (isText ? (
          <h1
            style={{
              color: "var(--white)",
              fontSize: ComponentSize,
              transform: `scaleX(-1)`,
              userSelect: "none"
            }}
          >
            {value}
          </h1>
        ) : (
          <img
            src={value}
            alt="icon"
            draggable={false}
            style={{
              width: ComponentSize,
              height: ComponentSize,
              transform: `scaleX(-1)`,
              pointerEvents: "none",
              userSelect: "none"
            }}
          />
        ))}
    </div>
  );
};

export default MemoryButton;