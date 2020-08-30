import React from "react";
import "./TouchController.css";
import Button from "react-bootstrap/Button";

function TouchController({ onChangeDir }) {
  return (
    <div className="tc-container">
      <div className="tc-grid">
        <Button
          variant="light"
          className="tc-button tc-up"
          onClick={() => onChangeDir("up")}
        >
          &#x2191;
        </Button>
        <Button
          variant="light"
          className="tc-button tc-left"
          onClick={() => onChangeDir("left")}
        >
          &#x2190;
        </Button>
        <Button
          variant="light"
          className="tc-button tc-right"
          onClick={() => onChangeDir("right")}
        >
          &#x2192;
        </Button>
        <Button
          variant="light"
          className="tc-button tc-down"
          onClick={() => onChangeDir("down")}
        >
          &#x2193;
        </Button>
      </div>
    </div>
  );
}

export default TouchController;
