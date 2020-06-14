import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";
import Modal from "../../components/UI/Modal/Modal";
import RideDataDisplay from "./rideDataDisplay/RideDataDisplay";
import Stats from "../Stats/Stats";
import Days from "./Day/Days";
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
		const updateStates = { ...this.state };
		updateStates.modalShow = true;
		this.setState({ modalShow: true });
		const file = event.target.files[0];
		this.props.traininglogData(file, this.props.userId);
	};

	hideCartHandler = () => {
		this.setState({ modalShow: false });
	};

	getTimeCreated = () => {
		let arrayofobject = this.props.trainings;
		let timeCreated = arrayofobject.map((training) => {
			return training.time_created;
		});
		let unique = [...new Set(timeCreated)];
		return unique;
	};

	render() {
		return (
			<div className={classes.Calendar}>
				<Months
					currentMonth={this.props.month}
					prevMonth={() => this.props.prevMonth(this.props.month)}
					nextMonth={() => this.props.nextMonth(this.props.month)}
				/>
				<Weekdays currentMonth={this.props.month} />
				<Days12 />
				<Modal show={this.state.modalShow} modalClosed={this.hideCartHandler}>
					<RideDataDisplay confirmHandler={this.hideCartHandler} />
				</Modal>
				<Stats />
			</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
