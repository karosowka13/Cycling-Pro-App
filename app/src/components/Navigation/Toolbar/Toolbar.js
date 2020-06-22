import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Drawer/Menu/Menu";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div>
			<Menu clicked={props.menuClicked} />
		</div>
		<div className={classes.Logo}>
			<Logo />
		</div>{" "}
		<div className={classes.ButtonIcon}>
			<label htmlFor="single">
				<CloudUploadIcon fontSize="inherit" />
			</label>
			<input
				type="file"
				id="single"
				onChange={props.onChange}
				onClick={(event) => (event.target.value = null)}
			/>
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuth={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;
