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
}) {
  const [name, setName] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [scoreIsSaved, setScoreIsSaved] = useState(false);

  useEffect(() => {
    if (show) {
      setLeaderboard(null);
      fetchLeaderboard().then(setLeaderboard);
    } else {
      setScoreIsSaved(false);
    }
  }, [show, scoreIsSaved]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
        {!leaderboard && <p>Loading leaderboard...</p>}
        {leaderboard && leaderboard.map((entry, i) => <p key={i}>{entry}</p>)}
        {!scoreIsSaved && (
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={(event) => setName(event.target.value)}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        {!scoreIsSaved && (
          <Button
            variant="light"
            onClick={() => {
              if (name) {
                saveScore(name).then(setScoreIsSaved(true));
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
