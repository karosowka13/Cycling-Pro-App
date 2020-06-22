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
					<label htmlFor={props.idValue}>
						<AddCircleOutlineIcon />
					</label>
					<input
						type="file"
						id={props.idValue}
						onChange={props.onChange}
						onClick={(event) => (event.target.value = null)}
					/>
				</React.Fragment>
			);
			break;
		case "EditIcon":
			icon = <EditIcon onClick={props.onClick} />;
			break;
		case "DeleteIcon":
			icon = <DeleteIcon onClick={props.onClick} />;
			break;
		default:
			icon = null;
	}
	return <div className={classes.ButtonIcon}>{icon}</div>;
};

export default buttonIcon;
