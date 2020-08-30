import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResultModal({
  show,
  handleClose,
  header,
  body,
  fetchLeaderboard,
  saveScore,
  scoreCanBeSaved,
}) {
  const [name, setName] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    if (show) {
      setLeaderboard(null);
      fetchLeaderboard().then(setLeaderboard);
    }
  }, [show, scoreCanBeSaved]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body && <p>{body}</p>}
        {!leaderboard && <p>Loading leaderboard...</p>}
        {leaderboard && leaderboard.map((entry, i) => <p key={i}>{entry}</p>)}
        {!scoreCanBeSaved && (
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={(event) => setName(event.target.value)}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        {!scoreCanBeSaved && (
          <Button
            variant="light"
            onClick={() => {
              if (name) {
                saveScore(name);
              }
            }}
          >
            Save
          </Button>
        )}
        <Button
          variant="light"
          onClick={() => {
            if (name && !scoreIsSaved) {
              saveScore(name);
            }
            handleClose();
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;
