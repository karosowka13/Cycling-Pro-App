export function training(data) {
	const trainingSummary = [];
	let dataToArray = Object.keys(data).map((key) => [key, data[key]]);
	for (let [key, value] of dataToArray) {
		key = key.replace(/_/g, " ");
		if (!isNaN(value) && !(value % 1 === 0)) {
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

export function centerGeolocation(coords) {
	if (coords.length === 1) {
		return coords[0];
	}

	let x = 0.0;
	let y = 0.0;
	let z = 0.0;

	for (let coord of coords) {
		let latitude = (coord[0] * Math.PI) / 180;
		let longitude = (coord[1] * Math.PI) / 180;

		x += Math.cos(latitude) * Math.cos(longitude);
		y += Math.cos(latitude) * Math.sin(longitude);
		z += Math.sin(latitude);
	}

	let total = coords.length;

	x = x / total;
	y = y / total;
	z = z / total;

	let centralLongitude = Math.atan2(y, x);
	let centralSquareRoot = Math.sqrt(x * x + y * y);
	let centralLatitude = Math.atan2(z, centralSquareRoot);

	return [
		(centralLatitude * 180) / Math.PI,
		(centralLongitude * 180) / Math.PI,
	];
}
