import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import { training } from "../../../helpers/Training";
import TextInput from "../../../components/UI/TextInput/TextInput";
import Button from "../../../components/UI/Button/Button";

import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children !== this.props.children ||
			nextProps.loading !== this.props.loading
		);
	}

	submitHandler = () => {};
	showChartsHandler = () => {};
	render() {
		let content = null;
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.success && !this.props.loading) {
			//to do get the last object
			let convertedData = training(this.props.trainingData);
			let form = [];
			let total = [];
			let average = [];
			let maximum = [];
			// let month = convertedData.name["time created"].value.getMonth()+ 1
			// let day = convertedData.name["time created"].value.getDate()
			// let year = convertedData.name["time created"].value.getFullYear()
			//key = key.charAt(0).toUpperCase() + key.slice(1);
			let date = new Date(convertedData[0].value);
			date =
				date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
			console.log(date);
			form.push(
				<h2>{date}</h2>,
				<h2>
					{convertedData[1].value} {convertedData[2].value}
				</h2>
			);
			convertedData.forEach((stat) => {
				if (stat.name.match(/\btotal/g)) {
					stat.name = stat.name.replace(/total/g, "");

					total.push(
						<TextInput
							readOnly={true}
							key={stat.name}
							type={stat.name}
							label={stat.name}
							value={stat.value}
							placeholder={stat.name}
							touched={true}
							valid={true}
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
							touched={true}
							valid={true}
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
							touched={true}
							valid={true}
						/>
					);
				}
			});
			form.push(
				<h3>Total</h3>,
				<div className={classes.Total}>{total}</div>,
				<h3>Average</h3>,
				<div className={classes.Average}>{average}</div>,
				<h3>Maximum</h3>,
				<div className={classes.Maximum}>{maximum}</div>,
				<div className={classes.Buttons}>
					<Button key="charts" clicked={this.showChartsHandler} btnType="Small">
						Charts
					</Button>
					<Button key="submit" clicked={this.submitHandler} btnType="Small">
						Done
					</Button>
				</div>
			);
			content = <div className={classes.Container}>{form}</div>;
		} else if (this.props.error) {
			content = <h1>Error</h1>;
		}
		return <div className={classes.Form}>{content}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading,
		error: state.loadTraininglog.error,
		trainingData: state.loadTraininglog.trainings,
		success: state.loadTraininglog.success,
	};
};

export default connect(mapStateToProps, null)(RideDataDisplay);
