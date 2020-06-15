import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/index";

import "./App.css";
import WelcomPage from "./containers/WelcomPage/WelcomPage";
import Authentication from "./containers/Authentication/Authentication";
import Logged from "./hoc/Layout/Logged";
import Calendar from "./containers/Calendar/Calendar";
import Logout from "./containers/Authentication/Logout/Logout";
import Profile from "./containers/Calendar/Profile/Profile";

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		let secureRoutes = (
			<Switch>
				<Route
					path="/authentication/:type"
					render={(props) => <Authentication {...props} />}
				/>
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={WelcomPage} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuth) {
			secureRoutes = (
				<Logged>
					<Switch>
						<Route path="/calendar" component={Calendar} />
						<Route path="/logout" component={Logout} />
						<Route
							path="/authentication/:type"
							render={(props) => <Authentication {...props} />}
						/>
						<Route path="/" exact component={Calendar} />
						<Redirect from="*" to="/" />
					</Switch>
				</Logged>
			);
		}

		return <div className="App">{secureRoutes}</div>;
	}
}

const mapsStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapsStateToProps, mapDispatchToProps)(App));
