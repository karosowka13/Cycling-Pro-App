import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import ButtonIcon from "../../../components/UI/ButtonIcon/ButtonIcon";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import Cleave from "cleave.js/react";
import validate from "../../../components/Validation/Input/Validate";

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
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const PrettoSlider = withStyles({
	root: {
		color: "#1a8fff",
		height: 8,
	},
	thumb: {
		height: 20,
		width: 20,
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
	state = {
		modalShow: true,
		edit: false,
		showBox: false,
		valid: true,
		validationRules: { isHHMM: false },
	};

	componentDidMount() {
		this.props.fetchTSS(this.props.userId, this.props.day);
	}
	componentDidUpdate(prevProps) {
		if (this.props.TSS._id !== prevProps.TSS._id) {
			this.props.fetchTSS(this.props.userId, this.props.day);
		}
	}

	boxToggleHandler = () => this.setState({ showBox: !this.state.showBox });

	submitTSSHandler = () => {
		let valid = [];
		Object.keys(this.props.TSS).map((name) => {
			if (
				this.props.TSS[name].time !== null &&
				this.props.TSS[name].time !== 0
			) {
				valid.push(
					validate(this.props.TSS[name].time, this.state.validationRules)
				);
			}
		});

		if (valid.length === 0 || !valid.includes(false)) {
			this.props.addTSS(this.props.TSS, this.props.userId, this.props.day);
			this.props.confirmHandler();
		} else {
			alert("Input time in hh:mm format");
		}
	};

	removeTSSHandler = () => {
		this.props.removeTSS(this.props.TSS, this.props.userId);
	};

	sliderChangeHandler = (event, value, name) => {
		this.props.changeTSSValueHandler(value, name);
	};

	render() {
		let buttons = null;
		let form = [];

		let TSSData = this.props.TSS;
		Object.keys(TSSData).map((name) => {
			if (
				name !== "_id" &&
				name !== "day_assigned" &&
				name !== "athlete_id" &&
				name !== "__v"
			) {
				let icon = null;
				if (name === "study") {
					icon = <SchoolIcon />;
				} else if (name === "exam") {
					icon = <MenuBookIcon />;
				} else if (name === "race") {
					icon = <EmojiEventsIcon />;
				} else if (name === "housework") {
					icon = <HomeWorkIcon />;
				} else if (name === "party") {
					icon = <LocalBarIcon />;
				} else if (name === "concerns") {
					icon = <SentimentDissatisfiedIcon />;
				} else if (name === "journey") {
					icon = <FlightTakeoffIcon />;
				} else if (name === "shopping") {
					icon = <LocalGroceryStoreIcon />;
				} else if (name === "sickness") {
					icon = <HealingIcon />;
				} else if (name === "workout") {
					icon = <FitnessCenterIcon />;
				} else if (name === "others") {
					icon = <CheckBoxOutlineBlankIcon />;
				}
				let onStartValue = 0;
				if (TSSData[name].value !== null && TSSData[name].value !== 0) {
					onStartValue = TSSData[name].value;
				}
				let onStartTime = "";
				if (TSSData[name].time !== null && TSSData[name].time !== 0) {
					onStartTime = TSSData[name].time;
				}
				form.push(
					<React.Fragment>
						<div key={name.split("", 4)} className={classes.HintDisplay}>
							<div className={classes.Icon}>{icon}</div>
						</div>
						<Cleave
							key={name}
							className={classes.TimeInput}
							placeholder="hh:mm"
							options={{ time: true, timePattern: ["h", "m"] }}
							value={onStartTime}
							onChange={(event) => this.props.changeTSSTimeHandler(event, name)}
						/>
						<div className={classes.Slider}>
							<PrettoSlider
								key={name.split("", 3)}
								valueLabelDisplay="auto"
								aria-label="pretto slider"
								value={onStartValue}
								onChange={(event, value) =>
									this.sliderChangeHandler(event, value, name)
								}
							/>
						</div>
					</React.Fragment>
				);
			}
		});

		buttons = (
			<div key={"buttons2"} className={classes.Buttons}>
				{/* <ButtonIcon btntype="DeleteIcon" onClick={this.removeTSSHandler} /> */}
				<Button clicked={this.props.confirmHandler} btnType="Small">
					Cancel
				</Button>
				<Button key="submit" clicked={this.submitTSSHandler} btnType="Small">
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
		userId: state.auth.userId,
		day: state.date.day,
		TSS: state.statistics.TSS,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTSS: (form, userId, day) => dispatch(actions.addTSS(form, userId, day)),
		removeTSS: (form, userId) => dispatch(actions.removeTSS(form, userId)),
		fetchTSS: (userId, day) => dispatch(actions.fetchTSS(userId, day)),
		changeTSSValueHandler: (value, name) =>
			dispatch(actions.changeTSSValueHandler(value, name)),
		changeTSSTimeHandler: (event, name) =>
			dispatch(actions.changeTSSTimeHandler(event, name)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(AddTSS, axios));
