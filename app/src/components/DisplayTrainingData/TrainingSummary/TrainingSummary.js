import React from "react";
import { training, formatTime } from "../../../helpers/Training";
import TextInput from "../../UI/TextInput/TextInput";
import classes from "./TrainingSummary.module.css";
const trainingSummary = (props) => {
	let form = [];

	if (Object.entries(props.trainingData).length > 0) {
		let convertedData = training(props.trainingData);

		let total = [];
		let average = [];
		let maximum = [];
		let date = new Date(convertedData[0].value);
		date =
			date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
		form.push(
			<h2 key={date}>{date}</h2>,
			<h2 key={convertedData[0].value}>
				{convertedData[1].value} {convertedData[2].value}
			</h2>
		);
		convertedData.forEach((stat) => {
			if (stat.name.match(/\btotal/g)) {
				stat.name = stat.name.replace(/total/g, "");
				if (stat.name.match(/\btime/g)) {
					stat.value = formatTime(stat.value);
				}
				total.push(
					<TextInput
						readOnly={true}
						key={stat.name}
						type={stat.name}
						label={stat.name}
						value={stat.value}
						placeholder={stat.name}
					/>
				);
			} else if (stat.name.match(/\bavg/g)) {
				stat.name = stat.name.replace(/avg/g, "");

				average.push(
					<TextInput
						readOnly={true}
						key={stat.name}
						type={stat.name}
						label={stat.name}
						value={stat.value}
						placeholder={stat.name}
					/>
				);
			} else if (stat.name.match(/\bmax/g)) {
				stat.name = stat.name.replace(/max/g, "");

				maximum.push(
					<TextInput
						readOnly={true}
						key={stat.name}
						type={stat.name}
						label={stat.name}
						value={stat.value}
						placeholder={stat.name}
					/>
				);
			}
		});
		form.push(
			<h3 key={"headertotal"}>Total</h3>,
			<div key={"headertotalchild"} className={classes.Total}>
				{total}
			</div>,
			<h3 key={"headeavg"}>Average</h3>,
			<div key={"headeavgchild"} className={classes.Average}>
				{average}
			</div>,
			<h3 key={"headermax"}>Maximum</h3>,
			<div key={"heademaxchild"} className={classes.Maximum}>
				{maximum}
			</div>
		);
	}
	return <div className={classes.Container}>{form}</div>;
};

export default trainingSummary;
