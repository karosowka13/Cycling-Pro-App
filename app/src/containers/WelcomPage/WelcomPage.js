import React, { Component } from 'react';
import classes from './WelcomPage.module.css';
import Button1 from '../../components/UI/Button/Button1';
import { Link } from 'react-router-dom';

class WelcomPage extends Component {
  state = {
    loggedIn: false,
    createdAccount: false,
  };

  render() {
    return (
      <div className={classes.WelcomePage}>
        <div className={classes.Form}>
          <Link exact to="/login">
            <Button1 name="Log in" />
          </Link>
          <Link to="/createaccount">
            <Button1 name="Sign up" />
          </Link>
        </div>
      </div>
    );
  }
}

export default WelcomPage;
