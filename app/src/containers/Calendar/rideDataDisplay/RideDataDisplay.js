import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./RideDataDisplay.module.css";

class RideDataDisplay extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children !== this.props.children ||
			nextProps.loading !== this.props.loading
		);
	}
	render() {
		let content = null;
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.success && !this.props.loading) {
			//get the last object
			let trainingData = this.props.trainingData;
			content = (
				<DynamicForm
					readOnly={true}
					dataObject={trainingData}
					submitHandler={this.props.confirmHandler}
					cancelHandler={this.props.confirmHandler}
				/>
			);
		} else if (this.props.error) {
			content = <h1>Error</h1>;
		}
		return <Fragment>{content}</Fragment>;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading,
		error: state.loadTraininglog.error,
		trainingData: state.loadTraininglog.trainings,
		success: state.loadTraininglog.success,
	};
};

export default connect(mapStateToProps, null)(RideDataDisplay);
