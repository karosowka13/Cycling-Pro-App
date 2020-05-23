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
  };

  render() {
    let rideDataMessage = null;
    if (this.props.loading) {
      rideDataMessage = (
        <Backdrop>
          <div className={classes.BackgroundWindow}>
            <Spinner />
          </div>
        </Backdrop>
      );
      const queryParams =
        "?auth=" +
        this.props.token +
        "&oderBy=" +
        `"userId"` +
        "&equalTo=" +
        `"${this.props.userId}"`;
      axios
        .get(
          "https://cycling-pro-app.firebaseio.com/trainingLog.json" +
            queryParams
        )
        .then((response) => {
          this.setState = { rideData: response.data };
        })
        .catch((err) => {
          console.log(err);
          this.setState = { error: err };
        });
    }
    if (this.state.rideData) {
      rideDataMessage = (
        <Backdrop>
          <div className={classes.BackgroundWindow}>
            <p>{this.state.rideData}</p>
          </div>
        </Backdrop>
      );
    } else if (this.state.error) {
      rideDataMessage = <p>Error</p>;
    }
    return rideDataMessage;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(RideDataDisplay);
