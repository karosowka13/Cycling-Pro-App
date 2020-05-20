import React, { Component } from "react";
import * as dateFns from "date-fns";
import axios from "axios";
import { SportsLib } from "@sports-alliance/sports-lib";
import ButtonIcon from "../../components/UI/ButtonIcon/ButtonIcon";
import Months from "../../components/Months/Months";
import Weekdays from "../../components/Weekdays/Weekdays";
import classes from "./Calendar.module.css";

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    uploading: false,
    sucessfullUploaded: false,
    trainingLog: [],
  };

  onFileChange = (event) => {
    const updateStates = { ...this.state };
    updateStates.uploading = true;
    this.setState({ state: updateStates });
    const file = event.target.files[0];
    let arrayBuffer = [];
    var fr = new FileReader();
    fr.onload = function () {
      const data = fr.result;
      arrayBuffer = new Int8Array(data);
      SportsLib.importFromFit(arrayBuffer).then((event) => {
        // const trainingData = new FormData();

        // event.forEach((file, i) => {
        //   trainingData.append(i, file);
        // });

        let trainingLog = event.stats;
        let trainingLogObj = {};
        for (let [key, value] of trainingLog) {
          trainingLogObj[key] = value;
        }
        console.log(trainingLogObj, trainingLog);

        // let trainingLogJSON = [...trainingLog.keys()];
        axios
          .post(
            "https://cycling-pro-app.firebaseio.com/trainingLog.json",
            trainingLogObj
          )
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      });
    };
    fr.readAsArrayBuffer(file);
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
            <span className={classes.Number}>{dayNumber}</span>

            <ButtonIcon
              btntype="AddCircleOutlineIcon"
              onChange={this.onFileChange}
            ></ButtonIcon>
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

export default Calendar;
