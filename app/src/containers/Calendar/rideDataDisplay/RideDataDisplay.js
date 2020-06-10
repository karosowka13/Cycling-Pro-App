import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import * as actions from "../../../store/actions/index";

import Spinner from "../../../components/UI/Spinner/Spinner";
import { training, formatTime } from "../../../helpers/Training";
import TextInput from "../../../components/UI/TextInput/TextInput";
import Button from "../../../components/UI/Button/Button";
import Chart from "../../../components/Charts/chart";
import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
	state = { displaying: null };
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children !== this.props.children ||
			nextProps.loading !== this.props.loading ||
			this.state.chart !== nextState.chart
		);
	}

	submitHandler = () => {};
	showStatsHandler = () => {
		if (this.state.chart) {
			this.props.loadChart(this.props.trainingData._id);
		} else if (this.state.training) {
		} else if (this.state.map) {
		}
	};
	render() {
		let content = null;
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.successChart && !this.props.loading) {
			content = <Chart records={this.props.chartData} />;
		} else if (this.props.successTraining && !this.props.loading) {
			//to do get the last object
			let convertedData = training(this.props.trainingData);
			let form = [];
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
			content = <div className={classes.Container}>{form}</div>;
		} else if (this.props.error) {
			content = <h1>Error</h1>;
		}
		if (this.props.successTraining || this.props.successChart) {
			let buttonName = [];
			switch (this.state.displaying) {
				case "chart":
					buttonName = "Chart";
				case "map":
					buttonName.push("Map");
				case "training":
					buttonName.push("Training");
					break;
				default: {
					buttonName = <p>Error 404</p>;
				}
			}
			content.push(
				<div key={"buttons2"} className={classes.Buttons}>
					<Link to={`${match.url}/${buttonName[0]}`}>
						<Button
							key="charts"
							clicked={this.showStatsHandler}
							btnType="Small"
						>
							{buttonName[0]}
						</Button>
					</Link>
					<Link to={`${match.url}/${buttonName[1]}`}>
						<Button key="map" clicked={this.showStatsHandler} btnType="Small">
							{buttonName[1]}
						</Button>
					</Link>
					<Button key="submit" clicked={this.submitHandler} btnType="Small">
						Done
					</Button>
					<Route path={`${match.path}/training`} render={} />
					<Route path={`${match.path}/chart`} render={} />
					<Route path={`${match.path}/map`} render={} />
				</div>
			);
		}
		return <div className={classes.Form}>{content}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading || state.chart.loading,
		error: state.loadTraininglog.error || state.chart.loading,
		trainingData: state.loadTraininglog.trainings,
		successTraining: state.loadTraininglog.success,
		chartData: state.chart.records,
		successChart: state.chart.success,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadChart: (trainingId) => dispatch(actions.loadChartData(trainingId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RideDataDisplay);
