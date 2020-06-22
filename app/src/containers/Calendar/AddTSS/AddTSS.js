import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import ButtonIcon from "../../../components/UI/ButtonIcon/ButtonIcon";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import TextInput from "../../../components/UI/TextInput";

import classes from "./AddTSS.module.css";

import SchoolIcon from "@material-ui/icons/School";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HealingIcon from "@material-ui/icons/Healing";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const PrettoSlider = withStyles({
	root: {
		color: "#1a8fff",
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		marginTop: -8,
		marginLeft: -12,
		"&:focus, &:hover, &$active": {
			boxShadow: "inherit",
		},
	},
	active: {},
	valueLabel: {
		left: "calc(-50% + 4px)",
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

class AddTSS extends Component {
	state = { displaying: "Training", modalShow: true, edit: false };
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children !== this.props.children ||
			nextProps.loading !== this.props.loading
		);
	}

	render() {
		let buttons = null;
		let form = (
			<React.Fragment>
				<EmojiEventsIcon />
				<TextInput
					readOnly={!this.state.edit}
					key={name}
					type="number"
					label={name}
					value={formElement.value}
					onChange={(event) =>
						this.props.changeTSSHandler(event, formElement.id)
					}
				/>
				<PrettoSlider
					valueLabelDisplay="auto"
					aria-label="pretto slider"
					defaultValue={0}
				/>
			</React.Fragment>
		);
		buttons = (
			<div key={"buttons2"} className={classes.Buttons}>
				<ButtonIcon btntype="DeleteIcon" />

				<Button
					key="submit"
					clicked={this.props.confirmHandler}
					btnType="Small"
				>
					Done
				</Button>
			</div>
		);

		return (
			<Modal
				show={this.state.modalShow}
				modalClosed={this.props.confirmHandler}
			>
				<div className={classes.Form}>
					{form}
					{buttons}
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading || state.chart.loading,
		error: state.loadTraininglog.error || state.chart.loading,
		trainingData: state.loadTraininglog.trainings,
		successTraining: state.loadTraininglog.success,
		chartData: state.chart.records,
		successChart: state.chart.success,
		day: state.date.day,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadChart: (trainingId) => dispatch(actions.loadChartData(trainingId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTSS);
