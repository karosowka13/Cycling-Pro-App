import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../../store/actions/index";

import Spinner from "../../../components/UI/Spinner/Spinner";
import TextInput from "../../../components/UI/TextInput/TextInput";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import classes from "./Profile.module.css";

class Profile extends Component {
	state = {
		modalShow: true,
		edit: false,
	};

	componentDidMount() {
		this.props.fetchProfile(this.props.userId);
	}

	submitHandler = (event) => {
		event.preventDefault();
		if (this.state.edit) {
			console.log(this.props.profileData);
			this.props.updateProfile(this.props.userId, this.props.profileData);
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

	render() {
		let buttons = null;
		let content = [];
		if (this.props.loading) {
			content = <Spinner />;
		} else if (this.props.profileData) {
		}
		if (this.props.fetchSuccess) {
			content = [];
			let form = [];
			for (let key in this.props.profileData) {
				form.push({ id: key, value: this.props.profileData[key] });
			}

			form.map((formElement) => {
				let name = formElement.id.replace(/_/g, " ");
				name = name.replace(/default/g, "");
				content.push(
					<TextInput
						readOnly={!this.state.edit}
						key={name}
						type={name}
						label={name}
						value={formElement.value}
						onChange={(event) =>
							this.props.changeProfileHandler(event, formElement.id)
						}
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
					<Button key="ok" clicked={this.submitHandler} btnType="Small">
						OK
					</Button>
				</div>
			);
		}

		return (
			<Modal show={this.state.modalShow} modalClosed={this.submitHandler}>
				<div className={classes.Form}>
					<p>Profile</p>
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
		fetchSuccess: state.profile.success,
		updateSuccess: state.profile.updateSuccess,
		deleteSuccess: state.profile.deleteSuccess,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeProfileHandler: (event, data) =>
			dispatch(actions.changeProfileHandler(event, data)),
		fetchProfile: (userId) => dispatch(actions.fetchProfile(userId)),
		updateProfile: (userId, form) =>
			dispatch(actions.updateProfile(userId, form)),
		deleteProfile: (userId) => dispatch(actions.deleteProfile(userId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Profile)
);
