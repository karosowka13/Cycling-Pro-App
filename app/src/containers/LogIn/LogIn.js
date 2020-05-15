import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import validate from "../../components/Validation/Input/Validate";
import TextInput from "../../components/UI/TextInput/TextInput";
import Button from "../../components/UI/Button/Button";
import classes from "./LogIn.module.css";

class LogIn extends Component {
  state = {
    loading: false,
    dataIsValid: false,
    formData: {
      email: {
        value: "",
        placeholder: "name@domain.com",
        valid: false,
        touched: false,
        validationRules: { isEmail: false, isRequired: true },
      },
      password: {
        value: "",
        placeholder: "minimum 8 characters",
        valid: false,
        touched: false,
        validationRules: { minLength: 8, isRequired: true },
      },
    },
  };

  submitHandler = (event) => {
    event.preventDefault(); //prevent reload of the page
    this.setState({ loading: true });
    const formAuth = {};
    // add only the input to send it to DB
    for (let formElementIdentifier in this.state.formData) {
      formAuth[formElementIdentifier] = this.state.formData[
        formElementIdentifier
      ].value;
      this.props.onAuth(formAuth);
    }
  };

  changeHandler = (event, formElementName) => {
    const name = formElementName;
    const value = event.target.value;

    const updatedData = {
      ...this.state.formData,
    };

    const updatedDataElement = {
      ...updatedData[name],
    };

    updatedDataElement.value = value;
    updatedDataElement.touched = true && value !== "";
    updatedDataElement.valid = validate(
      value,
      updatedDataElement.validationRules
    );

    updatedData[name] = updatedDataElement;

    let dataIsValid = true;
    for (let inputIdentifier in updatedData) {
      dataIsValid = updatedData[inputIdentifier].valid && dataIsValid;
    }

    this.setState({
      dataIsValid: dataIsValid,
      formData: updatedData,
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.formData) {
      formElementArray.push({ id: key, config: this.state.formData[key] });
    }

    return (
      <div className={classes.Form}>
        <div>
          <header>
            <h1>Log In</h1>
          </header>
          {formElementArray.map((formElement) => (
            <TextInput
              key={formElement.id}
              type={formElement.id}
              label={formElement.id}
              value={formElement.config.value}
              placeholder={formElement.config.placeholder}
              touched={formElement.config.touched}
              valid={formElement.config.valid}
              onChange={(event) => this.changeHandler(event, formElement.id)}
            />
          ))}

          <div className={classes.RememberForgotBox}>
            <input type="checkbox" />
            <label>Remember Me</label>
            <Link className={classes.ForgotLink} to="/recoverpassword">
              Forgot Password?
            </Link>
          </div>
          <Button
            disabled={!this.state.dataIsValid}
            onClick={this.submitHandler}
          >
            Log in
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};
export default connect(null, mapDispatchToProps)(LogIn);
