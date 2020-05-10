import React, { useState } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Drawer from '../../components/Navigation/Drawer/Drawer';

function Layout(props) {
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
}

export default Layout;
