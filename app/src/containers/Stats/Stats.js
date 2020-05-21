import React, { Component } from "react";
import classes from "./Stats.module.css";

class Stats extends Component {
  state = {};
  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Captions}>
          <p>Stats</p>
          <p>Total duration</p>
          <p>Total distance</p>
          <p>Total TSS</p>
        </div>
        <div className={classes.Week}>This week</div>
        <div className={classes.Month}>This month</div>
      </div>
    );
  }
}

export default Stats;
