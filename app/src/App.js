import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/index";

import "./App.css";
import WelcomPage from "./containers/WelcomPage/WelcomPage";
import Authentication from "./containers/Authentication/Authentication";
import Logged from "./hoc/Layout/Logged";
import Calendar from "./containers/Calendar/Calendar";
import Logout from "./containers/Authentication/Logout/Logout";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let secureRoutes = (
      <Switch>
        <Route
          exact
          path="/authentication/:type"
          render={(props) => <Authentication {...props} />}
        />
        <Route exact path="/" component={WelcomPage} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      secureRoutes = (
        <Switch>
          <Logged>
            <Route path="/logged/calendar" component={Calendar} />
          </Logged>
          <Route path="/logout" component={Logout} />
          <Redirect to="/logged/calendar" />
        </Switch>
      );
    }

    return (
      <Router>
        <div className="App">{secureRoutes}</div>
      </Router>
    );
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
