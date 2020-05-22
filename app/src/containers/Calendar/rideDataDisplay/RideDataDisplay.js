import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
  state = {
    rideData: null,
    error: false,
    userId: this.props.userId,
    token: this.props.token,
  };

  render() {
    let rideDataMessage = null;
    if (this.props.loading) {
      rideData = (
        <Backdrop>
          <div className={classes.BackgroundWindow}>
            <Spinner />
          </div>
        </Backdrop>
      );
      const queryParams =
        "?auth=" +
        token +
        "&oderBy=" +
        `"userId"` +
        "&equalTo=" +
        `"${userId}"`;
      axios
        .get("https://cycling-pro-app.firebaseio.com/trainingLog.json")
        .then((response) => {
          this.state.rideData = response.data;
        })
        .catch((err) => {
          console.log(err);
          this.state.error = err;
        });
    }
    if (this.state.rideData) {
      rideData = (
        <Backdrop>
          <div className={classes.BackgroundWindow}>
            <p>{this.state.rideData}</p>
          </div>
        </Backdrop>
      );
    } else if (this.state.error) {
      rideData = <p>Error</p>;
    }
    return rideDataMessage;
  }
}

const mapStateToProps = (state) => {
  return { loading: state.auth.loading, error: state.auth.error };
};

export default connect(mapStateToProps, null)(RideDataDisplay);
