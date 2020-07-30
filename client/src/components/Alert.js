import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';


function AlertDismissibleExample(props) {
    const [show, setShow] = useState(true);
    const errorTag = props.error.map((error, index) => {
        return (
        <p key={index}>{error}</p>
        )
    })
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <div>
          {errorTag}
          </div> 
        </Alert>
      )
    }else{
        return (
            <></>
        )
    }
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  
  export default AlertDismissibleExample;