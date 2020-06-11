import * as actionTypes from "./actionTypes";
import axios from "axios";

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
			.get(process.env.REACT_APP_SERVER + queryParams)
			.then((res) => {
				const fetchedStatistics = [];
				for (let key in res.data) {
					fetchStatistics.push({
						...res.data[key],
						id: key,
					});
				}
				dispatch(fetchStatisticsSuccess(fetchedStatistics));
			})
			.catch((err) => {
				dispatch(fetchStatisticsFail(err));
			});
	};
};
