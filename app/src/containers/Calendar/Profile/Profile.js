import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../../store/actions/index";

import { training } from "../../../helpers/Training";

import Spinner from "../../../components/UI/Spinner/Spinner";
import TextInput from "../../../components/UI/TextInput/TextInput";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import classes from "./Profile.module.css";

class Profile extends Component {
	state = {
		modalShow: true,
		edit: false,
		updatedData: {
			weight: { value: "", placeholder: "mass" },
			gender: { value: "", placeholder: "female/male" },
			age: { value: "", placeholder: "age" },
			height: { value: "", placeholder: "height" },
			resting_heart_rate: { value: "", placeholder: "resting HR" },
			default_max_biking_heart_rate: { value: "", placeholder: "max bike HR" },
			default_max_heart_rate: { value: "", placeholder: "max HR" },
			functional_treshold_power: { value: "", placeholder: "treshold power" },
			max_heart_rate: { value: "", placeholder: "max HR" },
		},
	};

	componentDidMount() {
		this.props.fetchProfile(this.props.userId);
	}

	submitHandler = (event) => {
		event.preventDefault();
		if (this.state.edit) {
			let updatedProfile = {
				weight: this.state.updatedData.weight.value,
				gender: this.state.updatedData.gender.value,
				age: this.state.updatedData.age.value,
				height: this.state.updatedData.height.value,
				resting_heart_rate: this.state.updatedData.resting_heart_rate.value,
				default_max_biking_heart_rate: this.state.updatedData
					.default_max_heart_rate.value,
				default_max_heart_rate: this.state.updatedData.default_max_heart_rate
					.value,
				functional_threshold_power: this.state.updatedData
					.functional_treshold_power.value,
				max_heart_rate: this.state.updatedData.max_heart_rate.value,
			};
			console.log(updatedProfile);
			this.props.updateProfile(this.props.userId, updatedProfile);
		}
		this.props.history.push({ pathname: "/" });
	};

	deleteHandler = () => {
		this.props.deleteProfile(this.props.userId);
		this.props.history.push({ pathname: "/logout" });
	};

	editHandler = () => {
		this.setState({ edit: true });
	};

	cancelHandler = () => {
		this.props.history.goBack();
	};

	changeHandler = (event, data) => {
		let name = data;
		name = name.replace(/ /g, "_");
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

	writeDataHandler = (data) => {
		this.setState({
			updatedData: data,
		});
	};

	render() {
		let buttons = null;
		let content = [];
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.profileData) {
			let profileForm = { ...this.props.profileData };
			profileForm = training(profileForm);
			let updateStateFromData = profileForm.forEach((data) => {
				const value = data.value;
				let name = data.name;
				name = name.replace(/ /g, "_");
				const updatedData = {
					...this.state.updatedData,
				};

				const updatedDataInfo = {
					...updatedData[name],
				};

				updatedDataInfo.value = value;

				updatedData[name] = updatedDataInfo;
				return updatedDataInfo;
			});
			this.writeDataHandler(updateStateFromData);
		}
		if (this.props.fetchSuccess) {
			let form = [];
			for (let key in this.state.updatedData) {
				form.push({ id: key, config: this.state.updatedData[key] });
			}
			form.map((formElement) => {
				formElement.id = formElement.id.replace(/_/g, " ");
				content.push(
					<TextInput
						readOnly={!this.state.edit}
						key={formElement.id}
						type={formElement.id}
						label={formElement.id}
						value={formElement.config.value}
						placeholder={formElement.config.placeholder}
						onChange={(event) => this.changeHandler(event, formElement.id)}
					/>
				);
			});
		}
		if (this.props.fetchSuccess) {
			buttons = (
				<div key={"buttons2"} className={classes.Buttons}>
					<Button key="delete" clicked={this.deleteHandler} btnType="Small">
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

					<Button key="ok" clicked={this.submitHandler} btnType="Small">
						OK
					</Button>
				</div>
			);
		}

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
		profileData: state.profile.profileData[0],
		error: state.profile.error,
		fetchSuccess: state.profile.success,
		updateSuccess: state.profile.updateSuccess,
		deleteSuccess: state.profile.deleteSuccess,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: (userId) => dispatch(actions.fetchProfile(userId)),
		updateProfile: (userId, form) =>
			dispatch(actions.updateProfile(userId, form)),
		deleteProfile: (userId) => dispatch(actions.deleteProfile(userId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Profile)
);
