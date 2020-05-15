import React from "react";
import classes from "./TextInput.module.css";

const textInput = (props) => {
  const inputClasses = [classes.FormData];
  if (props.touched && !props.valid) {
    inputClasses.push(classes.FormDataError);
  }

  let errorMessage = <p>.</p>;
  if (!props.valid && props.touched) {
    errorMessage = (
      <p className={classes.ErrorMessage}>Please enter correct {props.label}</p>
    );
  }

  return (
    <div className={classes.Input}>
      <h1>{props.label}</h1>
      <input {...props} className={inputClasses.join(" ")} />
      {errorMessage}
    </div>
  );
};

export default textInput;
