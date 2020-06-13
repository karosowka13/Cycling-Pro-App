import React, { Component } from "react";
import * as dateFns from "date-fns";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ButtonIcon from "../../components/UI/ButtonIcon/ButtonIcon";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";
import Modal from "../../components/UI/Modal/Modal";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import RideDataDisplay from "./rideDataDisplay/RideDataDisplay";
import Stats from "../Stats/Stats";
import classes from "./Calendar.module.css";

class Calendar extends Component {
	state = {
		today: new Date(),
		modalShow: false,
	};
	componentDidMount() {
		this.startFetching();
	}
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.month !== this.props.month ||
			nextProps.day !== this.props.day ||
			nextProps.trainings !== this.props.trainings ||
			nextState.show !== this.state.modalShow ||
			nextProps.children !== this.props.children
		);
	}

	componentDidUpdate(prevProps) {
		if (this.props.month !== prevProps.month) {
			this.startFetching();
		}
	}

	startFetching = () => {
		let from = dateFns.startOfWeek(dateFns.startOfMonth(this.props.month));
		let to = dateFns.endOfWeek(dateFns.endOfMonth(from));
		from = dateFns.formatISO(from, { representation: "date" });
		to = dateFns.formatISO(to, { representation: "date" });
		this.props.fetchTrainings(from, to, this.props.userId);
	};

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

	renderCells() {
		const currentMonth = this.props.month;
		const selectedDate = this.props.day;
		const monthStart = dateFns.startOfMonth(currentMonth);
		const monthEnd = dateFns.endOfMonth(monthStart);
		const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
		const endDate = dateFns.endOfWeek(monthEnd, { weekEndsOn: 1 });
		const dateFormat = "d";
		const rows = [];

		let days = [];
		let day = startDate;
		let trainedDays = this.getTimeCreated();

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				let trainingIcon = null;
				const cloneDay = day;

				if (trainedDays.length > 0) {
					trainedDays.forEach((trainedDay) => {
						trainedDay = dateFns.parseISO(trainedDay);
						if (dateFns.isSameDay(cloneDay, trainedDay)) {
							trainingIcon = <DirectionsBikeIcon style={{ fontSize: 40 }} />;
							console.log("thesame");
						}
					});
				}

				let dayNumber = dateFns.format(cloneDay, dateFormat);
				const cellClasses = [classes.Cell];

				if (!dateFns.isSameMonth(day, monthStart)) {
					cellClasses.push(classes.Disabled);
				} else if (dateFns.isSameDay(day, selectedDate)) {
					cellClasses.push(classes.Selected);
					//	console.log("selected")
				} else if (dateFns.isSameDay(day, this.state.today)) {
					cellClasses.push(classes.Today);
					//console.log("today")
				}

				if (cloneDay)
					days.push(
						<div
							className={cellClasses.join(" ")}
							key={day}
							onClick={() => this.props.onDayClick(cloneDay)}
						>
							<div className={classes.Container}>
								<div className={classes.Number}>{dayNumber}</div>
								<ButtonIcon
									btntype="AddCircleOutlineIcon"
									onChange={this.onFileChange}
								/>
								<ButtonIcon
									btntype="EditIcon"
									onClick={this.editOrPlanTraining}
								/>
								<ButtonIcon
									btntype="DeleteIcon"
									onClick={this.deleteTraining}
								/>{" "}
								<div className={classes.Activity}>{trainingIcon}</div>
							</div>
						</div>
					);
				day = dateFns.addDays(day, 1);
			}
			rows.push(
				<div className={classes.DaysRow} key={day}>
					{days}
				</div>
			);
			days = [];
		}
		return <div className={classes.AllDaysContainer}>{rows}</div>;
	}

	render() {
		return (
			<div className={classes.Calendar}>
				<Months
					currentMonth={this.props.month}
					prevMonth={() => this.props.prevMonth(this.props.month)}
					nextMonth={() => this.props.nextMonth(this.props.month)}
				/>
				<Weekdays currentMonth={this.props.month} />
				{this.renderCells()}
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
		onDayClick: (day) => dispatch(actions.onDateClick(day)),
		nextMonth: (month) => dispatch(actions.nextMonth(month)),
		prevMonth: (month) => dispatch(actions.prevMonth(month)),
		fetchTrainings: (from, to, userId) =>
			dispatch(actions.fetchTrainings(from, to, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
