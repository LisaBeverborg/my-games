import React from "react";
import "./ModeSwitch.css";

function ModeSwitch({ isMarkMode, onChange }) {
  return (
    <div className="mode-switch">
      <div className="ms-icon-container">
        <span className="ms-icon">🏴</span>
      </div>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={isMarkMode}
            onChange={onChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default ModeSwitch;
