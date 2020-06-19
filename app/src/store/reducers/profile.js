import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	profileData: {
		weight: "",
		gender: "",
		age: "",
		height: "",
		resting_heart_rate: "",
		default_max_biking_heart_rate: "",
		default_max_heart_rate: "",
		max_heart_rate: "",
	},
	success: false,
	updateSuccess: false,
	deleteSuccess: false,
};

const fetchProfileStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchProfileSuccess = (state, action) => {
	let oneRecord = {};
	let newest = {};
	for (let key in action.profileData) {
		if (state.profileData[key] !== undefined) {
			oneRecord[key] = action.profileData[key];
			Object.assign(newest, updateObject(state.profileData, oneRecord));
		}
	}
	return updateObject(state, {
		profileData: newest,
		loading: false,
		success: true,
	});
};

const changeProfile = (state, action) => {
	let name = action.profileData[0];
	let value = action.profileData[1];
	let record = {};
	record[name] = value;
	const updatedProfile = updateObject(state.profileData, record);
	console.log(updatedProfile);
	return updateObject(state, { profileData: updatedProfile });
};

const fetchProfileFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const updateProfileSuccess = (state, action) => {
	return updateObject(state, {
		loading: false,
		updateSuccess: true,
	});
};

const deleteProfileSuccess = (state, action) => {
	return updateObject(state, { loading: false, deleteSuccess: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROFILE_START:
			return fetchProfileStart(state, action);
		case actionTypes.FETCH_PROFILE_SUCCESS:
			return fetchProfileSuccess(state, action);
		case actionTypes.FETCH_PROFILE_FAIL:
			return fetchProfileFail(state, action);
		case actionTypes.DELETE_PROFILE:
			return deleteProfileSuccess(state, action);
		case actionTypes.UPDATE_PROFILE:
			return updateProfileSuccess(state, action);
		case actionTypes.CHANGE_PROFILE:
			return changeProfile(state, action);
		default:
			return state;
	}
};

export default reducer;
