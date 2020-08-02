import React from 'react';

const Logout = (props) => {
    return (
        <div>
            <button onClick={props.logOut}>Logout</button>
        </div>
    );
};

export default Logout;