import React from "react";
import classes from "./Weekdays.module.css";
import * as dateFns from "date-fns";

const weekdays = (props) => {
  const dateFormat = "EEEE";
  const days = [];

  let startDate = dateFns.startOfWeek(props.currentMonth);

  //start from Monday
  for (let i = 1; i < 8; i++) {
    days.push(
      <div className={classes.Day} key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className={classes.Days}>{days}</div>;
};

export default weekdays;
