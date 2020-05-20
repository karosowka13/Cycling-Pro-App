import React, { Component } from "react";
import * as dateFns from "date-fns";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ButtonIcon from "../../components/UI/ButtonIcon/ButtonIcon";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";
import classes from "./Calendar.module.css";

class Calendar extends Component {
  state = {
    today: new Date(),
    currentMonth: new Date(),
    selectedDate: new Date(),
    loading: false,
    sucessfullUploaded: false,
    trainingLog: [],
  };

  onFileChange = (event) => {
    const updateStates = { ...this.state };
    updateStates.loading = true;
    this.setState({ state: updateStates });
    const file = event.target.files[0];
    this.props.traininglogData(file);
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

        days.push(
          <div
            className={cellClasses.join(" ")}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <div className={classes.Container}>
              <span className={classes.Number}>{dayNumber}</span>
              <ButtonIcon
                btntype="AddCircleOutlineIcon"
                onChange={this.onFileChange}
              />
              <ButtonIcon btntype="EditIcon" />
              <ButtonIcon btntype="DeleteIcon" />
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
    return <div>{rows}</div>;
  }

  render() {
    return (
      <div className={classes.Calendar}>
        <Months
          currentMonth={this.state.currentMonth}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
        />
        <Weekdays currentMonth={this.state.currentMonth} />
        {this.renderCells()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loadTraininglog.loading,
    error: state.loadTraininglog.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    traininglogData: (trainingLog) =>
      dispatch(actions.loadTraininglog(trainingLog)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
