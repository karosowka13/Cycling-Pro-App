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

// export const updateProfile = () => {
// 	return {
// 		type: actionTypes.UPDATE_PROFILE,
// 	};
// };

// export const deleteProfile = () => {
// 	return {
// 		type: actionTypes.DELETE_PROFILE,
// 	};
// };

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return { type: actionTypes.AUTH_LOGOUT };
};

export const fetchProfile = (userId) => {
	return (dispatch) => {
		dispatch(fetchProfileStart());
		const queryParams = "/athletes/" + userId;
		axios
			.get(process.env.REACT_APP_SERVER + queryParams)
			.then((res) => {
				const fetchedProfile = [];
				fetchedProfile.push(res.data);
				dispatch(fetchProfileSuccess(fetchedProfile));
			})
			.catch((err) => {
				dispatch(fetchProfileFail(err));
			});
	};
};

export const updateProfile = (userId, data) => {
	return (dispatch) => {
		const queryParams = "/athletes/" + userId;
		axios
			.put(process.env.REACT_APP_SERVER + queryParams, data)
			.then((res) => {
				const fetchedProfile = [];
				fetchedProfile.push(res.data);
				dispatch(fetchProfileSuccess(fetchedProfile));
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
			.delete(process.env.REACT_APP_SERVER + queryParams)
			.then((res) => {
				dispatch(deleteProfile());
				dispatch(logout());
			})
			.catch((err) => {
				dispatch(fetchProfileFail(err));
			});
	};
};
