import React from "react";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import classes from "./DynamicForm.module.css";
import { training } from "../Helpers/Training";

const dynamicForm = (props) => {
	let convertedData = training(props.dataObject);
	let form = [];

	convertedData.forEach((stat) => {
		form.push(
			<TextInput
				key={stat.name}
				type={stat.name}
				label={stat.name}
				value={stat.value}
				placeholder={stat.name}
			/>
		);
	});
	form.push(
		<Button key="submit" clicked={props.submitHandler}>
			OK
		</Button>,
		<Button key="cencel" clicked={props.cencelHandler}>
			Cancel
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
