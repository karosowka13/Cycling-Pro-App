import * as actionTypes from "./actionTypes";
import * as dateFns from "date-fns";

export const setDay = (day) => {
	return {
		type: actionTypes.SET_DAY,
		day: day,
	};
};

export const setMonth = (month) => {
	return {
		type: actionTypes.SET_MONTH,
		month: month,
	};
};

export const nextMonth = (currentMonth) => {
	return (dispatch) => {
		dispatch(setMonth(dateFns.addMonths(currentMonth, 1)));
	};
};

export const prevMonth = (currentMonth) => {
	return (dispatch) => {
		dispatch(setMonth(dateFns.subMonths(currentMonth, 1)));
	};
};

export const onDateClick = (day) => {
	return (dispatch) => {
		dispatch(setDay(day));
	};
};
