import React from "react";
import classes from "./ButtonIcon.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";

const buttonIcon = (props) => {
  let icon = null;
  switch (props.btntype) {
    case "AddCircleOutlineIcon":
      icon = <AddCircleOutlineIcon />;
      break;
    case "EditIcon":
      icon = <EditIcon />;
      break;
    default:
      icon = null;
  }
  return (
    <div className={classes.ButtonIcon} onClick={props.clicked}>
      {icon}
    </div>
  );
};

export default buttonIcon;
