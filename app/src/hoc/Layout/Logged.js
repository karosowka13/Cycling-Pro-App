import React, { Component } from "react";
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
        <Toolbar menuClicked={this.drawerMenuHandler} />
        <Drawer
          open={this.state.showDrawer}
          closed={this.drawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Logged;
