import React from "react";
import * as dateFns from "date-fns";
import classes from "./Months.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const months = (props) => {
  const dateFormat = "MMMM Y";

  return (
    <div className={classes.Header}>
      <div className={classes.Previous}>
        <ArrowBackIosIcon style={{ fontSize: 40 }} onClick={props.prevMonth} />
      </div>
      <div className={classes.Month}>
        {dateFns.format(props.currentMonth, dateFormat)}
      </div>
      <div className={classes.Next}>
        <ArrowForwardIosIcon
          style={{ fontSize: 40 }}
          onClick={props.nextMonth}
        />
      </div>
    </div>
  );
};
export default months;
