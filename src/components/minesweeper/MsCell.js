import React from "react";
import "./MsCell.css";

function MsCell({
  isOpen,
  isMarked,
  isMine,
  minesAround,
  onClick,
  onRightClick,
}) {
  return (
    //(ternary operator ? true:false)
    <div
      className={"ms-cell " + (isOpen ? "ms-cell-open" : "")}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {/*condition && condition && (true) */}
      {isMarked && !isOpen && <span className="ms-icon fas fa-flag"></span>}
      {isMine && isOpen && <span className="ms-icon fa fa-bomb"></span>}
      {!isMine && isOpen && minesAround > 0 && (
        <span className={`ms-icon ms-number ms-${minesAround}`}>
          {minesAround}
        </span>
      )}
    </div>
  );
}

export default MsCell;
