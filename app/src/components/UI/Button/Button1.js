import React from 'react';
import classes from './Button1.module.css';

const button1 = (props) => {
  return <button className={classes.Button}>{props.name}</button>;
};

export default button1;
