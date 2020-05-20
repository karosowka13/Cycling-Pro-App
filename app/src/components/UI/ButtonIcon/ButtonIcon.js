import React from "react";
import classes from "./ButtonIcon.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";

const buttonIcon = (props) => {
  let icon = null;
  switch (props.btntype) {
    case "AddCircleOutlineIcon":
      icon = (
        <div className={classes.ButtonIcon}>
          <label htmlFor="single">
            <AddCircleOutlineIcon />
          </label>
          <input type="file" id="single" onChange={props.onChange} />
        </div>
      );
      break;
    case "EditIcon":
      icon = <EditIcon />;
      break;
    default:
      icon = null;
  }
  return icon;
};

export default buttonIcon;
