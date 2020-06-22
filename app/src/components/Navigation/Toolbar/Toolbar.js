import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Drawer/Menu/Menu";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div>
			<Menu clicked={props.menuClicked} />
		</div>
		<div className={classes.Logo}>
			<Logo />
		</div>{" "}
		<div className={classes.ButtonIcon}>
			<PictureAsPdfIcon fontSize="inherit" />
			<label htmlFor="multi">
				<CloudUploadIcon fontSize="inherit" />
			</label>
			<input
				type="file"
				id="multi"
				onChange={props.onChange}
				onClick={(event) => (event.target.value = null)}
				multiple
			/>
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuth={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;
