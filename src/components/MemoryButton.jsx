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

  // ✅ detect if value is image or not
  const isImage =
    typeof value === "string" &&
    (value.includes(".png") ||
      value.includes(".jpg") ||
      value.includes(".jpeg") ||
      value.includes(".svg"));

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
        (isImage ? (
          // 🖼️ IMAGE
          <img
            src={value}
            alt="icon"
            style={{
              width: ComponentSize,
              height: ComponentSize,
              transform: `scaleX(-1)`,
            }}
          />
        ) : (
          // 🔤 NUMBER OR LETTER
          <h1
            style={{
              color: "var(--white)",
              fontSize: ComponentSize,
              transform: `scaleX(-1)`,
            }}
          >
            {value}
          </h1>
        ))}
    </div>
  );
};

export default MemoryButton;