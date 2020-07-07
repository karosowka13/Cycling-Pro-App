import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import { lastElement } from "../../../helpers/Training";

import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import TrainingSummary from "../../../components/DisplayTrainingData/TrainingSummary/TrainingSummary";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Chart from "../../../components/DisplayTrainingData/Charts/chart";
import ChartsMobile from "../../../components/DisplayTrainingData/ChartsMobile/ChartsMobile";
import Map from "../../../components/DisplayTrainingData/Map/Map";
import Modal from "../../../components/UI/Modal/Modal";
import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
	state = { displaying: "Training", modalShow: true };
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

	showStatsHandler = (type, training, athleteid) => {
		if (type === "Chart") {
			this.props.loadChart(training._id, athleteid);
			this.setState({ displaying: "Chart" });
		} else if (type === "Training") {
			this.setState({ displaying: "Training" });
		} else if (type === "Map") {
			this.props.loadChart(training._id, athleteid);
			this.setState({ displaying: "Map" });
		}
	};

	render() {
		let buttons = null;
		let buttonName = [];
		let content = null;
		let training = [];
		let displayButtons = false;

		if (this.props.trainingData) {
			//get displayed training
			for (let i of this.props.trainingData) {
				if (typeof this.props.day !== "undefined") {
					if (new Date(i.time_created).getDay() === this.props.day.getDay()) {
						training = i;
						displayButtons = true;
					}
				} else training = lastElement(this.props.trainingData);
			}
		}

		if (this.props.loading || this.state.loading) {
			content = <Spinner />;
		} else if (
			this.props.successChart &&
			!this.props.loading &&
			this.state.displaying === "Chart"
		) {
			if (this.props.chartData) {
				content = (
					<React.Fragment>
						<Chart key="chart" records={this.props.chartData} />
						<ChartsMobile key="chartM" records={this.props.chartData} />
					</React.Fragment>
				);
			} else content = <p key="erroe">Error</p>;
		} else if (
			(this.props.successTraining || this.props.trainingData) &&
			!this.props.loading &&
			this.state.displaying === "Training"
		) {
			//to do get right day training
			content = <TrainingSummary trainingData={training} />;
		} else if (
			this.props.successChart &&
			!this.props.loading &&
			this.state.displaying === "Map"
		) {
			if (this.props.chartData) {
				content = <Map key="mapp" coordinates={this.props.chartData} />;
			}
		} else if (this.props.error) {
			content = <h1 key="erroree">Error</h1>;
		}

		if (
			(this.props.successTraining ||
				this.props.successChart ||
				displayButtons) &&
			!this.props.loading
		) {
			if (this.state.displaying === "Training") {
				buttonName.push("Map", "Chart");
			} else if (this.state.displaying === "Chart") {
				buttonName.push("Map", "Training");
			} else if (this.state.displaying === "Map") {
				buttonName.push("Training", "Chart");
			}

			let attachedClasses = [classes.Buttons, classes[this.state.displaying]];
			buttons = (
				<div key={"buttons2"} className={attachedClasses.join(" ")}>
					<Button
						key="charts"
						clicked={() =>
							this.showStatsHandler(
								buttonName[0],
								training,
								this.props.athleteid
							)
						}
						btnType="Small"
					>
						{buttonName[0]}
					</Button>

					<Button
						key="map"
						clicked={() =>
							this.showStatsHandler(
								buttonName[1],
								training,
								this.props.athleteid
							)
						}
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
			<Modal
				show={this.state.modalShow}
				modalClosed={this.props.confirmHandler}
			>
				<div key="display" className={classes.Form}>
					{content}
					{buttons}
				</div>
			</Modal>
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
		day: state.date.day,
		athleteid: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadChart: (trainingId, athleteid) =>
			dispatch(actions.loadChartData(trainingId, athleteid)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(RideDataDisplay, axios));
