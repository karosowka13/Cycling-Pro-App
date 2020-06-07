export function training(data) {
	const trainingSummary = [];
	let dataToArray = Object.keys(data).map((key) => [key, data[key]]);
	for (let [key, value] of dataToArray) {
		key = key.replace(/_/g, " ");
		if (!isNaN(value)) {
			value = parseFloat(value.toFixed(2));
		}
		if (
			key === " v" ||
			key === " id" ||
			key === "total cycles" ||
			key === "total descent"
		) {
			key = null;
			value = null;
		}
		if (key !== null && value !== null) {
			trainingSummary.push({
				name: key,
				value: value,
			});
		}
	}
	return trainingSummary;
}
