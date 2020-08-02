import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';


function AlertDismissibleExample(props) {
    const errorTag = props.error.map((error, index) => {
        return (
        <p key={index}>{error}</p>
        )
    })
    if (props.error.length > 0) {
      return (
        <Alert variant={props.variant} onClose={props.clearErrors} dismissible>
          <Alert.Heading>{props.message}</Alert.Heading>
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