import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/profile">Profile</NavigationItem>
			{!props.isAuth ? (
				<NavigationItem link="/authentication/login">Log in</NavigationItem>
			) : (
				<NavigationItem link="/logout">Log out</NavigationItem>
			)}
		</ul>
	);
};

export default navigationItems;
