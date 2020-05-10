import React from 'react';
import classes from './TextInput.module.css';
const textInput = (props) => {
  let formDataError = classes.FormData;
  if (props.touched && !props.valid) {
    formDataError = classes.FormDataError;
  }
  return (
    <div className={classes.Input}>
      <h1>{props.label}</h1>
      <input
        type={props.type}
        className={formDataError}
        valid={props.valid}
        touched={props.touched}
        {...props}
      />
    </div>
  );
};

export default textInput;
