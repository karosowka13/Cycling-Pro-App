import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import classes from "./Drawer.module.css";
const drawer = (props) => {
	let attachedClasses = [classes.Drawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.Drawer, classes.Open];
	}
	return (
		<React.Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
					<NavigationItem link="/stats">Statistics</NavigationItem>
				</nav>
			</div>
		</React.Fragment>
	);
};

export default drawer;
