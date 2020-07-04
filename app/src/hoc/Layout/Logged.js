import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";
import classes from "./Logged.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Logged extends Component {
	state = {
		showDrawer: false,
	};

	onFileChange = (event) => {
		event.preventDefault();
		const files = Array.from(event.target.files);
		const formData = this.toFormData(files);
		console.log(files[0], files);
		for (let i = 0; i < files.length; i++) {
			const file = new Blob([files[i]]);
			const file2 = new Blob([files[i]], { type: "application/octet-stream" });
			console.log(file, file2);
			formData.append("file", file2);
		}
		const file = new Blob([files[0]], { type: "application/octet-stream" });
		formData.append("file", file);
		console.log(formData);
		this.props.loadMultipleTraining(formData, this.props.userId);
		this.props.history.push("/trainingStats");
	};

	toFormData = (obj) => {
		var form_data = new FormData();
		for (var key in obj) {
			form_data.append(key, obj[key]);
		}
		return form_data;
	};

	drawerClosedHandler = () => {
		this.setState({ showDrawer: false });
	};
	drawerOpenHandler = () => {
		this.setState({ showDrawer: true });
	};

	drawerMenuHandler = () => {
		this.setState((prevState) => ({
			showDrawer: !prevState.showDrawer,
		}));
	};
	render() {
		return (
			<React.Fragment>
				<Toolbar
					menuClicked={this.drawerMenuHandler}
					isAuth={this.props.isAuth}
					onChange={this.onFileChange}
				/>
				<Drawer
					isAuth={this.props.isAuth}
					open={this.state.showDrawer}
					closed={this.drawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadMultipleTraining: (trainingLog, userId) =>
			dispatch(actions.loadMultipleTraining(trainingLog, userId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logged));
