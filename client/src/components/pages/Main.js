import React from 'react';
import Libs from '../libs/Libs'
import LoginBar from '../LoginBar'

const Main = () => {
    return (
        <div>
            <LoginBar />
            <h1>Checkout the most recent MovieLibs!</h1>
            <Libs />
        </div>
    );
};

export default Main;