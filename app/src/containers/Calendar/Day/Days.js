import React, { Component } from "react";
import * as dateFns from "date-fns";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import ButtonIcon from "../../../components/UI/ButtonIcon/ButtonIcon";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import classes from "./Days.module.css";

class Day extends Component {
	constructor(props) {
		super(props);
		this.dayField = React.createRef();
  }

	state = {
		today: new Date(),
	};

	componentDidMount() {
		this.startFetching();
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return (
	// 		nextProps.month !== this.props.month ||
	// 		nextProps.day !== this.props.day ||
	// 		nextProps.trainings !== this.props.trainings ||
	// 		nextState.show !== this.state.modalShow ||
	// 		nextProps.children !== this.props.children
	// 	);
	// }

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

	getTimeCreated = () => {
		let arrayofobject = this.props.trainings;
		let timeCreated = arrayofobject.map((training) => {
			return training.time_created;
		});
		let unique = [...new Set(timeCreated)];
		return unique;
	};

	render() {
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
				const cloneDay = day;
				const trainingIcon = [];
				if (trainedDays.length > 0) {
					trainedDays.forEach((trainedDay) => {
						trainedDay = dateFns.parseISO(trainedDay);
						if (dateFns.isSameDay(cloneDay, trainedDay)) {
							trainingIcon.push(
								<DirectionsBikeIcon key={cloneDay} style={{ fontSize: 40 }} />
							);
							//cellClasses.push(classes.Activity);
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
					this.day.current.focus();
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
							ref={this.day}
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
								/>
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
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.userId,
		day: state.date.day,
		month: state.date.month,
		trainings: state.loadTraininglog.trainings,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDayClick: (day) => dispatch(actions.onDateClick(day)),
		fetchTrainings: (from, to, userId) =>
			dispatch(actions.fetchTrainings(from, to, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
