import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchProfileSuccess = (profileData) => {
	return {
		type: actionTypes.FETCH_PROFILE_SUCCESS,
		profileData: profileData,
	};
};

export const fetchProfileFail = (error) => {
	return {
		type: actionTypes.FETCH_PROFILE_FAIL,
		error: error,
	};
};

export const fetchProfileStart = () => {
	return {
		type: actionTypes.FETCH_PROFILE_START,
	};
};

export const updateProfileSuccess = () => {
	return {
		type: actionTypes.UPDATE_PROFILE,
	};
};

export const deleteProfileSuccess = () => {
	return {
		type: actionTypes.DELETE_PROFILE,
	};
};

export const fetchProfile = (userId) => {
	return (dispatch) => {
		dispatch(fetchProfileStart());
		const queryParams = "/athletes/" + userId;
		axios
			.get(process.env.REACT_APP_SERVER + queryParams, {
				headers: {
					token: localStorage.getItem("token"),
				},
			})
			.then((res) => {
				const fetchedProfile = res.data;
				dispatch(fetchProfileSuccess(fetchedProfile));
			})
			.catch((err) => {
				dispatch(fetchProfileFail(err));
			});
	};
};

export const changeProfileHandler = (event, data) => {
	let name = data;
	name = name.replace(/ /g, "_");
	const value = event.target.value;
	let profileData = [name, value];
	return {
		type: actionTypes.CHANGE_PROFILE,
		profileData: profileData,
	};
};

export const updateProfile = (userId, data) => {
	return (dispatch) => {
		const queryParams = "/athletes/" + userId;
		axios
			.put(process.env.REACT_APP_SERVER + queryParams, {
				headers: {
					token: localStorage.getItem("token"),
				},
				data,
			})
			.then((res) => {
				dispatch(updateProfileSuccess);
			})
			.catch((err) => {
				dispatch(fetchProfileFail(err));
			});
	};
};

export const deleteProfile = (userId) => {
	return (dispatch) => {
		const queryParams = "/athletes/" + userId;
		axios
			.delete(process.env.REACT_APP_SERVER + queryParams, {
				headers: {
					token: localStorage.getItem("token"),
				},
			})
			.then((res) => {
				dispatch(deleteProfileSuccess());
			})
			.catch((err) => {
				dispatch(fetchProfileFail(err));
			});
	};
};
