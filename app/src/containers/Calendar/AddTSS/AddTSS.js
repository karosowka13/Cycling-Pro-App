import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "rc-tooltip/assets/bootstrap.css";

import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import Cleave from "cleave.js/react";

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
import Tooltip from "rc-tooltip";
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

	confirmAddTSSHandler = () => {
		this.props.addTSS(this.props.TSS, this.props.userId, this.props.day);
		this.props.confirmHandler();
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
		let comments = null;
		let TSSData = this.props.TSS;
		Object.keys(TSSData).map((name, index) => {
			if (
				name !== "_id" &&
				name !== "day_assigned" &&
				name !== "athlete_id" &&
				name !== "__v" &&
				name !== "comments"
			) {
				let icon = null;
				if (name === "study") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<SchoolIcon />
						</Tooltip>
					);
				} else if (name === "exam") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<MenuBookIcon />
						</Tooltip>
					);
				} else if (name === "race") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<EmojiEventsIcon />
						</Tooltip>
					);
				} else if (name === "housework") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<HomeWorkIcon />
						</Tooltip>
					);
				} else if (name === "party") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<LocalBarIcon />
						</Tooltip>
					);
				} else if (name === "concerns") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<SentimentDissatisfiedIcon />
						</Tooltip>
					);
				} else if (name === "journey") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<FlightTakeoffIcon />
						</Tooltip>
					);
				} else if (name === "shopping") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<LocalGroceryStoreIcon />
						</Tooltip>
					);
				} else if (name === "sickness") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<HealingIcon />
						</Tooltip>
					);
				} else if (name === "workout") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<FitnessCenterIcon />
						</Tooltip>
					);
				} else if (name === "others") {
					icon = (
						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>{name}</span>}
						>
							<CheckBoxOutlineBlankIcon />
						</Tooltip>
					);
				}
				let onStartValue = 0;
				if (
					TSSData[name].value !== null &&
					TSSData[name].value !== 0 &&
					!isNaN(TSSData[name].value)
				) {
					onStartValue = TSSData[name].value;
				}
				let onStartTime = "";
				if (TSSData[name].time !== null && TSSData[name].time !== 0) {
					onStartTime = TSSData[name].time;
				}
				form.push(
					<React.Fragment key={index}>
						<div className={classes.Icon}>{icon}</div>

						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>duration</span>}
						>
							<Cleave
								key={name}
								className={classes.TimeInput}
								placeholder="hh:mm"
								options={{ time: true, timePattern: ["h", "m"] }}
								value={onStartTime}
								onChange={(event) =>
									this.props.changeTSSTimeHandler(event, name)
								}
							/>
						</Tooltip>

						<Tooltip
							placement="topRight"
							trigger={["hover"]}
							mouseLeaveDelay="0.1"
							overlay={<span>intensity</span>}
						>
							<PrettoSlider
								className={classes.Slider}
								key={name.split("", 3)}
								valueLabelDisplay="auto"
								aria-label="pretto slider"
								value={onStartValue}
								defaultValue={onStartValue}
								onChange={(event, value) =>
									this.sliderChangeHandler(event, value, name)
								}
							/>
						</Tooltip>
					</React.Fragment>
				);
			}
		});
		let onStartText = null;
		if (TSSData.comments !== null && TSSData.comments !== 0) {
			onStartText = TSSData.comments;
		}
		comments = (
			<div className={classes.Comment}>
				<p>Comments after this training cycle:</p>
				<textarea
					value={onStartText}
					onChange={(event, value) =>
						this.props.textareaChangeHandler(event, value)
					}
				/>
			</div>
		);
		buttons = (
			<div key={"buttons2"} className={classes.Buttons}>
				{/* <ButtonIcon btntype="DeleteIcon" onClick={this.removeTSSHandler} /> */}
				<Button clicked={this.props.confirmHandler} btnType="Small">
					Cancel
				</Button>
				<Button
					key="submit"
					clicked={this.confirmAddTSSHandler}
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
				<h2 className={classes.Title}>Additional stress factors this week:</h2>
				<div className={classes.Form}>
					{form}
					{comments}
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
		textareaChangeHandler: (event, value) =>
			dispatch(actions.changeCommentHandler(event, value)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(AddTSS, axios));
