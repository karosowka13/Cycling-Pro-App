import React, { Component } from 'react';
import validate from '../../components/Validation/Input/Validate';
import TextInput from '../../components/TextInput/TextInput';
import classes from './CreateAccount.module.css';

class LogIn extends Component {
  state = {
    dataIsValid: false,
    formData: {
      email: {
        value: '',
        placeholder: 'name@domain.com',
        valid: false,
        touched: false,
        validationRules: { isEmail: false, isRequired: true },
      },
      password: {
        value: '',
        placeholder: 'minimum 8 characters',
        valid: false,
        touched: false,
        validationRules: { minLength: 8, isRequired: true },
      },
    },
  };

  submitHandler = () => {
    console.log(this.state.formData);
    console.log({ TextInput });
  };

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedData = {
      ...this.state.formData,
    };

    const updatedDataElement = {
      ...updatedData[name],
    };

    updatedDataElement.value = value;
    updatedDataElement.touched = true;
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
    return (
      <div className={classes.Form}>
        <div>
          <header>
            <h1>Sign In</h1>
          </header>
          <TextInput
            label="Email"
            type="email"
            name="email"
            value={this.state.formData.email.value}
            placeholder={this.state.formData.email.placeholder}
            onChange={this.changeHandler}
            touched={this.state.formData.email.touched}
            valid={this.state.formData.email.valid}
          />

          <TextInput
            label="Password"
            type="password"
            name="password"
            value={this.state.formData.password.value}
            placeholder={this.state.formData.password.placeholder}
            onChange={this.changeHandler}
            touched={this.state.formData.password.touched}
            valid={this.state.formData.password.valid}
          />

          <button
            className={classes.SubmitButton}
            disabled={!this.state.dataIsValid}
            onClick={this.submitHandler}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default LogIn;
