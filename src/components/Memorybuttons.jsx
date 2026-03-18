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
        transform: `rotateY(${isActive || isMatched ? 180 : 0}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!isMatched ? onClick : () => {}}
    >
      {value.length > 2 ? (
        <img
          src={value}
          alt=""
          style={{
            width: ComponentSize,
            height: ComponentSize,
            transform: `scaleX(-1)`,
            opacity: isActive || isMatched ? "1" : "0",
          }}
        />
      ) : (
        <h1
          style={{
            color: "var(--white)",
            fontSize: ComponentSize,
            transform: `scaleX(-1)`,
            opacity: isActive || isMatched ? "1" : "0",
          }}
        >
          {value}
        </h1>
      )}
    </div>
  );
};

export default MemoryButton;
