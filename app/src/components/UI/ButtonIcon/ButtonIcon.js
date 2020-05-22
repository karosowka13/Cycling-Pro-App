import React from "react";
import classes from "./ButtonIcon.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const buttonIcon = (props) => {
  let icon = null;
  switch (props.btntype) {
    case "AddCircleOutlineIcon":
      icon = (
        <React.Fragment>
          <label htmlFor="single">
            <AddCircleOutlineIcon />
          </label>
          <input type="file" id="single" onChange={props.onChange} />
        </React.Fragment>
      );
      break;
    case "EditIcon":
      icon = <EditIcon />;
      break;
    case "DeleteIcon":
      icon = <DeleteIcon />;
      break;
    default:
      icon = null;
  }
  return <div className={classes.ButtonIcon}>{icon}</div>;
};

export default buttonIcon;