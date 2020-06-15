import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	loading: false,
	error: null,
	profileData: {},
	success: false,
	updateSuccess: false,
	deleteSuccess: false,
};

const fetchProfileStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchProfileSuccess = (state, action) => {
	return updateObject(state, {
		profileData: action.profileData,
		loading: false,
		success: true,
	});
};

const fetchProfileFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

// const updateProfile = (state, action) => {
// 	return updateObject(state, {
// 		loading: false,
// 		updateSuccess: true,
// 		profileData: action.profileData,
// 	});
// };

// const deleteProfile = (state, action) => {
// 	return updateObject(state, { loading: false, deleteSuccess: true });
// };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROFILE_START:
			return fetchProfileStart(state, action);
		case actionTypes.FETCH_PROFILE_SUCCESS:
			return fetchProfileSuccess(state, action);
		case actionTypes.FETCH_PROFILE_FAIL:
			return fetchProfileFail(state, action);
		// case actionTypes.DELETE_PROFILE:
		// 	return deleteProfile(state, action);
		// case actionTypes.UPDATE_PROFILE:
		// 	return updateProfile(state, action);

		default:
			return state;
	}
};

export default reducer;
