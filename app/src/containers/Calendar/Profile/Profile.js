import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";

import { training } from "../../../helpers/Training";

import Spinner from "../../../components/UI/Spinner/Spinner";
import TextInput from "../../../components/UI/TextInput/TextInput";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import classes from "./Profile.module.css";

class Profile extends Component {
	state = {
		edit: false,
		updatedData: { weight: { value: "", placeholder: "mass" } },
		gender: { value: "", placeholder: "female/male" },
		age: { value: "", placeholder: "age" },
		height: { value: "", placeholder: "height" },
		resting_heart_rate: { value: "", placeholder: "resting HR" },
		default_max_biking_heart_rate: { value: "", placeholder: "max bike HR" },
		default_max_heart_rate: { value: "", placeholder: "max HR" },
		functional_treshold_power: { value: "", placeholder: "treshold power" },
		max_heart_rate: { value: "", placeholder: "max HR" },
	};

	componentDidMount() {
		this.props.fetchProfie(this.props.userId);
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.updateProfile(this.props.userId, this.state.updatedData);
		this.props.history.push({ pathname: "/calendar" });
	};

	// showModalHandler = () => {
	// 	this.setState({ modalShow: true });
	// };

	editHandler = () => {
		this.setState({ edit: true });
	};

	cancelHandler = () => {
		this.props.history.goBack();
	};

	changeHandler = (event, info) => {
		const name = info;
		const value = event.target.value;

		const updatedData = {
			...this.state.updatedData,
		};

		const updatedDataInfo = {
			...updatedData[name],
		};

		updatedDataInfo.value = value;

		updatedData[name] = updatedDataInfo;

		this.setState({
			updatedData: updatedData,
		});
	};

	render() {
		//     let profileRedirect =null;
		// if(){profileRedirect=	<Redirect to="/calendar" />;}
		let buttons = null;
		let content = null;
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.success) {
			let profileForm = training(this.props.profileData);
			profileForm.forEach((info) => {
				content.push(
					<TextInput
						readOnly={this.state.edit}
						key={info.name}
						type={info.name}
						label={info.name}
						value={info.value}
						placeholder={info.name}
						onChange={(event) => this.changeHandler(event, info.name)}
					/>
				);
			});
		}
		buttons = (
			<div key={"buttons2"} className={classes.Buttons}>
				<Button
					key="delete"
					clicked={this.props.deleteProfile(this.props.userId)}
					btnType="Small"
				>
					Delete account
				</Button>
				<Button key="cancel" clicked={this.cancelHandler} btnType="Small">
					Cancel
				</Button>

				<Button
					key="edit"
					clicked={this.editHandler}
					btnType="Small"
					disabled={this.state.edit}
				>
					Edit
				</Button>

				<Button key="ok" clicked={this.props.submitHandler} btnType="Small">
					OK
				</Button>
			</div>
		);

		return (
			<Modal show={this.state.modalShow} modalClosed={this.submitHandler}>
				<div className={classes.Form}>
					{content}
					{buttons}
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.userId,
		loading: state.profile.loading,
		profileData: state.profile.profileData,
		error: state.profile.error,
		fetchSucess: state.profile.success,
		updateSuccess: state.profile.updateSuccess,
		deleteSuccess: state.profile.deleteSuccess,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: (userId) => dispatch(actions.loadChartData(userId)),
		updateProfile: (userId, form) =>
			dispatch(actions.updateProfile(userId, form)),
		deleteProfile: (userId) => dispatch(actions.deleteProfile(userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
