import React from "react";
import * as dateFns from "date-fns";
import ButtonIcon from "../UI/ButtonIcon/ButtonIcon";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import classes from "./Calendar.module.css";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    const dateFormat = "MMMM Y";

    return (
      <div className={classes.header}>
        <div className={classes.Previous}>
          <ArrowBackIosIcon style={{ fontSize: 60 }} onClick={this.prevMonth} />
        </div>
        <div className={classes.Month}>
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className={classes.Next}>
          <ArrowForwardIosIcon
            style={{ fontSize: 60 }}
            onClick={this.nextMonth}
          />
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "EEEE";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={classes.Day} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className={classes.Days}>{days}</div>;
  }

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
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
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
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className={classes.Number}>{formattedDate}</span>
            <ButtonIcon btntype="AddCircleOutlineIcon" />
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

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
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

  render() {
    return (
      <div className={classes.Calendar}>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
