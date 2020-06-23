import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";
import { formatTime } from "../../helpers/Training";

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
export const addTSS = (TSS, userId, day) => {
	Object.keys(TSS).map((name) => {
		let a = TSS[name].time.split(":");
		let timeSec = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
		TSS[name].time = timeSec;
	});
	Object.assign(TSS, { day_assigned: day }, { athlete_id: userId });
	console.log(TSS);
	return (dispatch) => {
		const queryParams = "/athletes/" + userId + "/statistics/TSS";
		axios
			.put(process.env.REACT_APP_SERVER + queryParams, TSS)
			.then((res) => {
				const addedTSS = res.data;
				dispatch(addTSSSuccess(addedTSS));
			})
			.catch((err) => {
				dispatch(fetchStatisticsFail(err));
			});
	};
};
export const removeTSS = (TSS, userId) => {
	return (dispatch) => {
		const queryParams = "/athletes/" + userId + "/statistics/TSS" + TSS._id;
		axios
			.delete(process.env.REACT_APP_SERVER + queryParams)
			.then((res) => {
				const removedTSS = [];
				removedTSS.push(res.data);
				dispatch(removeTSSSuccess(removedTSS));
			})
			.catch((err) => {
				dispatch(fetchStatisticsFail(err));
			});
	};
};
export const fetchTSS = (userId, day) => {
	day = day.toISOString();
	return (dispatch) => {
		const queryParams = "/athletes/" + userId + "/statistics/TSS/" + day;
		axios
			.get(process.env.REACT_APP_SERVER + queryParams)
			.then((res) => {
				let TSS = res.data[0];
				Object.keys(TSS).map((name) => {
					if (TSS[name].time) {
						TSS[name].time = formatTime(TSS[name].time);
					}
					console.log(TSS[name].time);
				});
				if (TSS.length !== 0) {
					dispatch(addTSSSuccess(TSS));
				}
			})
			.catch((err) => {
				dispatch(fetchStatisticsFail(err));
			});
	};
};

export const changeTSSValueHandler = (valuee, name) => {
	const value = valuee;
	let TSSData = [name, value];
	return {
		type: actionTypes.CHANGE_TSS_VALUE,
		TSSData: TSSData,
	};
};

export const changeTSSTimeHandler = (event, name) => {
	const value = event.target.value;
	let TSSData = [name, value];

	return {
		type: actionTypes.CHANGE_TSS_TIME,
		TSSData: TSSData,
	};
};
