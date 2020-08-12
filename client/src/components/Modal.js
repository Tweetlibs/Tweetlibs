import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Example(props) {

  if (props.state === true) {
    return (
      <Modal show={props.state} onClose={props.close}>
        <Modal.Header>
          <Modal.Title>User Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.libbed}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close, props.reload}>
            Close
            </Button>
          <Button variant="primary" onClick={props.close, props.redirect}>
            Save Changes
            </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <></>
    )
  }
}
export default Example;