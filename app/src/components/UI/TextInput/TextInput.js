import React from "react";
import classes from "./TextInput.module.css";

const textInput = (props) => {
	const inputClasses = [classes.FormData];
	const input = [classes.Input];
	if (props.touched && !props.valid) {
		inputClasses.push(classes.FormDataError);
	}

	if (props.readOnly) {
		input.push(classes.displayOnly);
	}

	if (props.filledInput) {
		input.push(classes.FilledInput);
	}

	let errorMessage = <p>.</p>;
	if (!props.valid && props.touched) {
		errorMessage = (
			<p className={classes.ErrorMessage}>Please enter correct {props.label}</p>
		);
	}

	return (
		<div className={input.join(" ")}>
			<h1>{props.label}</h1>
			<input {...props} className={inputClasses.join(" ")} />
			{errorMessage}
		</div>
	);
};

export default textInput;
