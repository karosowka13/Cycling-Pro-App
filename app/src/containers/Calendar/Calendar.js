import React, { Component } from "react";
import * as dateFns from "date-fns";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ButtonIcon from "../../components/UI/ButtonIcon/ButtonIcon";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";
import Stats from "../Stats/Stats";
import classes from "./Calendar.module.css";
import RideDataDisplay from "./rideDataDisplay/RideDataDisplay";

class Calendar extends Component {
	state = {
		today: new Date(),
		currentMonth: new Date(),
		selectedDate: new Date(),
		loading: false,
		sucessfullUploaded: false,
		trainingLog: {},
	};

	onFileChange = (event) => {
		const updateStates = { ...this.state };
		updateStates.loading = true;
		this.setState({ state: updateStates });
		const file = event.target.files[0];
		this.props.traininglogData(file, this.props.userId);
	};

	nextMonth = () => {
		this.setState({
			currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
		});
	};

	prevMonth = () => {
		this.setState({
			currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
		});
	};

	onDateClick = (day) => {
		this.setState({
			selectedDate: day,
		});
	};
	renderCells() {
		const { currentMonth, selectedDate } = this.state;
		const monthStart = dateFns.startOfMonth(currentMonth);
		const monthEnd = dateFns.endOfMonth(monthStart);
		const startDate = dateFns.startOfWeek(monthStart);
		const endDate = dateFns.endOfWeek(monthEnd);

		const dateFormat = "d";
		const rows = [];

		let days = [];
		let day = startDate;

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				let dayNumber = dateFns.format(day, dateFormat);
				const cloneDay = day;
				const cellClasses = [classes.Cell];
				if (!dateFns.isSameMonth(day, monthStart)) {
					cellClasses.push(classes.Disabled);
				} else if (dateFns.isSameDay(day, selectedDate)) {
					cellClasses.push(classes.Selected);
				}
				if (dateFns.isSameDay(day, this.state.today)) {
					cellClasses.push(classes.Today);
				}

				days.push(
					<div
						className={cellClasses.join(" ")}
						key={day}
						onClick={() => this.onDateClick(cloneDay)}
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
							<ButtonIcon btntype="DeleteIcon" onClick={this.deleteTraining} />
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
					currentMonth={this.state.currentMonth}
					prevMonth={this.prevMonth}
					nextMonth={this.nextMonth}
				/>
				<RideDataDisplay display={this.state.loading} />
				<Weekdays currentMonth={this.state.currentMonth} />
				{this.renderCells()}
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		traininglogData: (trainingLog, userId) =>
			dispatch(actions.loadTraininglog(trainingLog, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
