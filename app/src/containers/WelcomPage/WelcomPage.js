import React, { Component } from "react";
import classes from "./WelcomPage.module.css";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";

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
            <Button name="Log in">Log in</Button>
          </Link>
          <Link to="/createaccount">
            <Button name="Sign up">Sign up</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default WelcomPage;
