import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Profile
    </NavigationItem>
    {!props.isAuth ? (
      <NavigationItem link="/logout">Log out</NavigationItem>
    ) : (
      <NavigationItem link="/">Log in</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
