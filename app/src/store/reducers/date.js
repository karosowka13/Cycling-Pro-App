import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	day: new Date(),
	month: new Date(),
};

const setDay = (state, action) => {
	return updateObject(state, { day: action.day });
};

const setMonth = (state, action) => {
	return updateObject(state, {
		month: action.month,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_DAY:
			return setDay(state, action);
		case actionTypes.SET_MONTH:
			return setMonth(state, action);

		default:
			return state;
	}
};

export default reducer;
