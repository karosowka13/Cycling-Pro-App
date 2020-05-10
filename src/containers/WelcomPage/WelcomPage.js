import React, { Component } from 'react';
import LogIn from '../LogIn/LogIn';
import CreateAccount from '../CreateAccount/CreateAccount';
import classes from './WelcomPage.module.css';
import Button1 from '../../components/UI/Button/Button1';
import { Link, Route, Switch } from 'react-router-dom';

class WelcomPage extends Component {
  state = {
    loggedIn: false,
    createdAccount: false,
  };

  render() {
    return (
      <div className={classes.WelcomePage}>
        <div className={classes.Form}>
          <Link to="/login">
            <Button1 name="Log in" />
          </Link>
          <Link to="/createaccount">
            <Button1 name="Sign in" />
          </Link>
        </div>
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route path="/createaccount" component={CreateAccount} />
        </Switch>
      </div>
    );
  }
}

export default WelcomPage;
