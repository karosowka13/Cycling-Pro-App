import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import validate from "../../components/Validation/Input/Validate";
import TextInput from "../../components/UI/TextInput/TextInput";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Authentication.module.css";

class Authentication extends Component {
  state = {
    isSignUp: true,
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
    this.props.onAuth(
      this.state.formData.email.value,
      this.state.formData.password.value,
      this.state.isSignUp
    );
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

  componentDidMount() {
    if (this.props.match.params.type === "login") {
      this.setState({ isSignUp: false });
    } else this.setState({ isSignUp: true });
  }
  render() {
    let formName = this.props.match.params.type;
    switch (formName) {
      case "login":
        formName = "Log in";
        break;
      case "signup":
        formName = "Sign up";
        break;
      default: {
        formName = <p>Error 404</p>;
      }
    }

    const formElementArray = [];
    for (let key in this.state.formData) {
      formElementArray.push({ id: key, config: this.state.formData[key] });
    }
    let form = formElementArray.map((formElement) => (
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
    ));
    form.push(
      <Button disabled={!this.state.dataIsValid} clicked={this.submitHandler}>
        {formName}
      </Button>
    );

    if (!this.state.isSignUp) {
      form.push(
        <div className={classes.RememberForgotBox}>
          <input type="checkbox" />
          <label>Remember Me</label>
          <Link className={classes.ForgotLink} to="/recoverpassword">
            Forgot Password?
          </Link>
        </div>
      );
    }

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      switch (this.props.error.message) {
        case "EMAIL_EXISTS":
          errorMessage = <p>Email already taken</p>;
          break;
        case "OPERATION_NOT_ALLOWED":
          errorMessage = <p>Password is disabled</p>;
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          errorMessage = <p>Too many attempts, try later</p>;
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage = <p>Email not found</p>;
          break;
        case "INVALID_PASSWORD":
          errorMessage = <p>Invalid password</p>;
          break;
        case "USER_DISABLED":
          errorMessage = <p>User disabled</p>;
          break;
        default:
          errorMessage = <p>{this.props.error.message}</p>;
      }
    }

    return (
      <div className={classes.Form}>
        <div>
          <header>
            <h1>{formName}</h1>
          </header>
          {errorMessage}
          {form}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loading: state.auth.loading, error: state.auth.error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
