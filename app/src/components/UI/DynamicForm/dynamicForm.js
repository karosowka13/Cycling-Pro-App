import React from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import classes from "./dynamicForm.module.css";

const dynamicForm = (props) => {
	let toArrayData = Object.keys(props.dataObject).map((key) => [
		key,
		props.dataObject[key],
	]);
	let form = toArrayData.forEach((name, value) => (
		<TextInput
			key={name}
			type={name}
			label={name}
			value={value}
			placeholder={name}
			onChange={props.onChange}
		/>
	));
	form.push(
		<Button
			key="submit"
			disabled={!props.dataIsValid}
			clicked={props.submitHandler}
		>
			OK
		</Button>,
		<Button key="cencel" clicked={props.cencelHandler}>
			cencel
		</Button>
	);
	return (
		<div className={classes.Container}>
			<h2>{props.title}</h2>
			{form}
		</div>
	);
};

export default dynamicForm;
