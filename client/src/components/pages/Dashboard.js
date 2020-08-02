import React, { Component } from 'react';
import Logout from '../Logout';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios'

class Dashboard extends Component {

handleLogout = () => {
    localStorage.setItem('loggedIn', false)
    window.location.reload();
    axios
      .get("/logout")
      .then((response) => {
        })
      .catch((error) => {console.log(error)})
};
    render() {
        if (localStorage.getItem('loggedIn') === 'true'){
        return (
            <div>
                <h1>You are now logged in</h1>
                <Logout logOut={this.handleLogout}/>
            </div>
        );
        }else{
            return (
                <Redirect from="/dashboard" to="/login"/>
                ) 
        }
    }
}

export default Dashboard;