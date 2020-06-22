import * as actionTypes from "./actionTypes";
import axios from "axios";
import AddTSS from "../../containers/Calendar/AddTSS/AddTSS";

export const fetchStatisticsSuccess = (statistics) => {
	return {
		type: actionTypes.FETCH_STATISTICS_SUCCESS,
		statistics: statistics,
	};
};

export const fetchStatisticsFail = (error) => {
	return {
		type: actionTypes.FETCH_STATISTICS_FAIL,
		error: error,
	};
};

export const fetchStatisticsStart = () => {
	return {
		type: actionTypes.FETCH_STATISTICS_START,
	};
};

export const fetchStatistics = (userId) => {
	return (dispatch) => {
		dispatch(fetchStatisticsStart());
		const queryParams = "/athletes/" + userId + "/statistics/onload";
		axios
			.get(process.env.REACT_APP_SERVER + queryParams, {
				headers: {
					token: localStorage.getItem("token"),
				},
			})
			.then((res) => {
				const fetchedStatistics = [];
				fetchedStatistics.push(res.data);
				dispatch(fetchStatisticsSuccess(fetchedStatistics));
			})
			.catch((err) => {
				dispatch(fetchStatisticsFail(err));
			});
	};
};

export const fetchTSSSuccess = (TSS) => {
	return {
		type: actionTypes.FETCH_TSS_SUCCESS,
		TSS: TSS,
	};
};
export const addTSSSuccess = (TSS) => {
	return {
		type: actionTypes.ADD_TSS_SUCCESS,
		TSS: TSS,
	};
};
export const removeTSSSuccess = (TSS) => {
	return {
		type: actionTypes.REMOVE_TSS_SUCCESS,
		TSS: TSS,
	};
};
export const addTSS = (TSS, date) => {};
export const removeTSS = (TSS, date) => {};
export const fetchTSS = (TSS, date) => {};
