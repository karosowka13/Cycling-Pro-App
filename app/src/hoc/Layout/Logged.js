import React, { useState } from "react";
import classes from "./Logged.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Drawer from "../../components/Navigation/Drawer/Drawer";

const Logged = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const drawerClosedHandler = () => {
    setShowDrawer(false);
  };
  const drawerOpenHandler = () => {
    setShowDrawer(true);
  };

  const drawerMenuHandler = () => {
    this.setState((prevState) => {
      return { showDrawer: !prevState.showDrawer };
    });
  };

  return (
    <React.Fragment>
      <Toolbar menuClicked={drawerMenuHandler} />
      <Drawer open={showDrawer} closed={drawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Logged;
