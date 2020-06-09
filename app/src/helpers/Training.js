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

export function formatTime(seconds) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.round(seconds % 60);
	return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
		.filter(Boolean)
		.join(":");
}
