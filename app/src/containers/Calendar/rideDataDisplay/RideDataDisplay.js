import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicForm from "../../../components/UI/DynamicForm/dynamicForm";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
	state = { display: false };

	cancelHandler = () => {
		this.setState({ display: false });
	};

	submitHandler = () => {
		this.setState({ display: false });
	};

	showHandler = () => {
		this.setState({ display: true });
	};

	render() {
		let content = null;
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.trainingData && !this.props.loading) {
			content = (
				<DynamicForm
					dataObject={this.props.trainingData}
					submitHandler={this.submitHandler}
					cancelHandler={this.cancelHandler}
				/>
			);
		} else if (this.props.error) {
			content = <p>Error</p>;
		}
		return (
			<Backdrop show={this.state.display}>
				<div className={classes.BackgroundWindow}>{content}</div>
			</Backdrop>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading,
		error: state.loadTraininglog.error,
		trainingData: state.loadTraininglog.trainingLog,
	};
};

export default connect(mapStateToProps, null)(RideDataDisplay);
