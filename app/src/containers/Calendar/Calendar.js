import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";

import RideDataDisplay from "./rideDataDisplay/RideDataDisplay";
import Stats from "../Stats/Stats";
import Days from "./Day/Days";
import Profile from "./Profile/Profile";
import classes from "./Calendar.module.css";

class Calendar extends Component {
	state = {
		modalShow: false,
	};

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.month !== this.props.month ||
			nextProps.day !== this.props.day ||
			nextProps.trainings !== this.props.trainings ||
			nextState.show !== this.state.modalShow ||
			nextProps.children !== this.props.children
		);
	}

	onFileChange = (event) => {
		event.preventDefault();
		this.setState({ modalShow: true });
		const file = event.target.files[0];
		this.props.traininglogData(file, this.props.userId);
		this.props.history.push("/trainingStats");
	};

	hideCartHandler = () => {
		//this.setState({ modalShow: false });
		this.props.history.push({ pathname: "/" });
	};

	showModalHandler = () => {
		this.setState({ modalShow: true });
	};

	getTimeCreated = () => {
		let arrayofobject = this.props.trainings;
		let timeCreated = arrayofobject.map((training) => {
			return training.time_created;
		});
		let unique = [...new Set(timeCreated)];
		return unique;
	};

	showRideHandler() {
		this.props.history.push("/trainingStats");
	}

	render() {
		return (
			<React.Fragment>
				<div className={classes.Calendar}>
					<Months
						currentMonth={this.props.month}
						prevMonth={() => this.props.prevMonth(this.props.month)}
						nextMonth={() => this.props.nextMonth(this.props.month)}
					/>
					<Weekdays currentMonth={this.props.month} />
					<Days showModal={this.onFileChange} showRide={this.showRideHandler} />
					<Switch>
						<Route exact path="/profile">
							<Profile confirmHandler={this.hideCartHandler} />
						</Route>
						<Route path="/trainingStats">
							<RideDataDisplay confirmHandler={this.hideCartHandler} />
						</Route>
					</Switch>
					<Stats />
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading,
		error: state.loadTraininglog.error,
		userId: state.auth.userId,
		day: state.date.day,
		month: state.date.month,
		trainings: state.loadTraininglog.trainings,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		traininglogData: (trainingLog, userId) =>
			dispatch(actions.loadTraininglog(trainingLog, userId)),
		nextMonth: (month) => dispatch(actions.nextMonth(month)),
		prevMonth: (month) => dispatch(actions.prevMonth(month)),
		onDayClick: (day) => dispatch(actions.onDateClick(day)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Calendar)
);
