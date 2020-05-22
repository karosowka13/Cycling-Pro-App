import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Logged.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Logged extends Component {
  state = {
    showDrawer: false,
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
  };
};

export default connect(mapStateToProps)(Logged);
