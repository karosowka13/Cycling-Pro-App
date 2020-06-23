import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";

import RideDataDisplay from "./rideDataDisplay/RideDataDisplay";
import Stats from "./rideDataDisplay/Stats/Stats";
import Days from "./Day/Days";
import Profile from "./Profile/Profile";
import AddTSS from "./AddTSS/AddTSS";
import classes from "./Calendar.module.css";

class Calendar extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.month !== this.props.month ||
			nextProps.day !== this.props.day ||
			nextProps.trainings !== this.props.trainings ||
			nextProps.children !== this.props.children
		);
	}

	onFileChange = (event) => {
		event.preventDefault();
		this.props.onDayClick(this.props.pastDay);
		const file = event.target.files[0];
		this.props.traininglogData(file, this.props.userId);
		this.props.history.push("/trainingStats");
	};

	addTSSHandler() {
		this.props.history.push("/addTSS");
	}

	hideCartHandler = () => {
		this.props.history.push({ pathname: "/" });
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
					<Days
						addTSS={this.addTSSHandler.bind(this)}
						showModal={this.onFileChange} //to refer to this when upload second time
						showRide={this.showRideHandler.bind(this)}
					/>
					<Switch>
						<Route exact path="/profile">
							<Profile confirmHandler={this.hideCartHandler} />
						</Route>
						<Route exact path="/trainingStats">
							<RideDataDisplay confirmHandler={this.hideCartHandler} />
						</Route>
						<Route exact path="/addTSS">
							<AddTSS confirmHandler={this.hideCartHandler} />
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
