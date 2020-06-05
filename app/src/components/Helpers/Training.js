export function training(data) {
	const trainingSummary = [];
	let dataToArray = Object.keys(data).map((key) => [key, data[key]]);
	for (let [key, value] of dataToArray) {
		key = key.charAt(0).toUpperCase() + key.slice(1);
		key = key.replace(/_/g, " ");
		if (!isNaN(value)) {
			value = parseFloat(value.toFixed(2));
		}
		trainingSummary.push({
			name: key,
			value: value,
		});
	}
	console.log(trainingSummary, "hoho", dataToArray);
	return trainingSummary;
}
