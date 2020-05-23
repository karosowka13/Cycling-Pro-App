import React from "react";
import LogoSmall from "../../assets/images/LogoSmall.png";
import classes from "./Logo.module.css";
const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={LogoSmall} alt="CyclingProApp" />
  </div>
);
export default logo;
