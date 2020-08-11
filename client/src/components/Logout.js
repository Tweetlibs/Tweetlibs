import React from 'react';
import { Button } from 'react-bootstrap'

const Logout = (props) => {
    return (
        <div>
            <Button variant="danger" onClick={props.logOut}>Logout</Button>
        </div>
    );
};

export default Logout;