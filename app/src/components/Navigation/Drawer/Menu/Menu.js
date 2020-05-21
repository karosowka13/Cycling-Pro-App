import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./Menu.module.css";

const menu = (props) => (
  <div className={classes.Menu} onClick={props.clicked}>
    <MenuIcon style={{ fontSize: "inherit" }} />
  </div>
);
export default menu;
