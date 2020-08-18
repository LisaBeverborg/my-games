import React from "react";
import Button from "react-bootstrap/Button";
import "./StatusBar.css";

function StatusBar({ status }) {
  return (
    <div className="status-bar">
      <p className="status">{status}</p>
      <Button variant="light" className="button">
        Restart
      </Button>
    </div>
  );
}

export default StatusBar;
