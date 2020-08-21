import React from "react";
import "./MemoryCard.css";

function MemoryCard({ isFlipped, color, onClick }) {
  return (
    <div className="memory-card-scene" onClick={onClick}>
      <div className={"memory-card-container " + (isFlipped ? "flipped" : "")}>
        <div className="memory-card back"></div>
        <div className={`memory-card front image ${color}`}></div>
      </div>
    </div>
  );
}

export default MemoryCard;
