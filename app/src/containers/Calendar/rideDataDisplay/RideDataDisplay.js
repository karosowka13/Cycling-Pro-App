import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import { lastElement } from "../../../helpers/Training";

import TrainingSummary from "../../../components/DisplayTrainingData/TrainingSummary/TrainingSummary";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Chart from "../../../components/DisplayTrainingData/Charts/chart";
import Map from "../../../components/DisplayTrainingData/Map/Map";
import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
	state = { displaying: "Training" };
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children !== this.props.children ||
			nextProps.loading !== this.props.loading ||
			this.state.displaying !== nextState.displaying
		);
	}
	componentWillUnmount() {
		this.setState({ displaying: "Training" });
	}

	showStatsHandler = (type) => {
		if (type === "Chart") {
			if (!this.props.successChart) {
				this.props.loadChart(this.props.trainingData._id);
			}
			this.setState({ displaying: "Chart" });
		} else if (type === "Training") {
			this.setState({ displaying: "Training" });
		} else if (type === "Map") {
			if (!this.props.successChart) {
				this.props.loadChart(this.props.trainingData._id);
			}
			this.setState({ displaying: "Map" });
		}
	};

	render() {
		let buttons = null;
		let buttonName = [];
		let content = null;
		if (this.props.loading || this.state.loading) {
			content = <Spinner />;
		} else if (
			this.props.successChart &&
			!this.props.loading &&
			this.state.displaying === "Chart"
		) {
			content = <Chart records={this.props.chartData} />;
		} else if (
			this.props.successTraining &&
			!this.props.loading &&
			this.state.displaying === "Training"
		) {
			//to do get last object from data
			//let last = lastElement(this.props.trainingData);
			let last = lastElement(this.props.trainingData);
			if (last !== 0 && Object.entries(last).length > 0) {
				content = <TrainingSummary trainingData={last} />;
			}
		} else if (
			this.props.successChart &&
			!this.props.loading &&
			this.state.displaying === "Map"
		) {
			content = <Map coordinates={this.props.chartData} />;
		} else if (this.props.error) {
			content = <h1>Error</h1>;
		}
		if (
			(this.props.successTraining || this.props.successChart) &&
			!this.props.loading
		) {
			if (this.state.displaying === "Training") {
				buttonName.push("Map", "Chart");
			} else if (this.state.displaying === "Chart") {
				buttonName.push("Map", "Training");
			} else if (this.state.displaying === "Map") {
				buttonName.push("Training", "Chart");
			}

			buttons = (
				<div key={"buttons2"} className={classes.Buttons}>
					<Button
						key="charts"
						clicked={() => this.showStatsHandler(buttonName[0])}
						btnType="Small"
					>
						{buttonName[0]}
					</Button>

					<Button
						key="map"
						clicked={() => this.showStatsHandler(buttonName[1])}
						btnType="Small"
					>
						{buttonName[1]}
					</Button>

					<Button
						key="submit"
						clicked={this.props.confirmHandler}
						btnType="Small"
					>
						Done
					</Button>
				</div>
			);
		}

		return (
			<div className={classes.Form}>
				{content}
				{buttons}
			</div>
		);
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
