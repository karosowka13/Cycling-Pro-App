import React, { Component } from "react";

import { formatTime } from "../../helpers/Training";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let data = this.props.records;

		let power = [];
		let altitude = [];
		let speed = [];
		let cadence = [];
		let heartrate = [];
		let temperature = [];
		for (let record of data) {
			power.push({ x: record.elapsed_time, y: record.accumulated_power });
			altitude.push({ x: record.elapsed_time, y: record.altitude });
			speed.push({ x: record.elapsed_time, y: record.speed });
			cadence.push({ x: record.elapsed_time, y: record.cadence });
			heartrate.push({ x: record.elapsed_time, y: record.heart_rate });
			temperature.push({ x: record.elapsed_time, y: record.temperature });
		}

		let options = {
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			axisX: {
				labelFormatter: function (e) {
					return formatTime(e.value);
				},
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "right",
				dockInsidePlotArea: true,
			},
			toolTip: {
				shared: true,
			},
			data: [
				{
					name: "Power",
					showInLegend: true,
					type: "area",
					color: "rgba(0,75,141,0.7)",
					markerSize: 0,
					dataPoints: power,
				},
				{
					name: "Altitude",
					showInLegend: true,
					type: "area",
					color: "rgba(40,175,101,0.6)",
					markerSize: 0,
					dataPoints: altitude,
				},
				{
					name: "Speed",
					showInLegend: true,
					color: "rgba(50,175,101,0.56)",
					type: "area",
					markerSize: 0,
					dataPoints: speed,
				},
				{
					name: "Cadence",
					showInLegend: true,
					color: "rgba(40,175,101,0.50)",
					type: "area",
					markerSize: 0,
					dataPoints: cadence,
				},
				{
					name: "Heart rate",
					showInLegend: true,
					color: "rgba(40,175,101,0.46)",
					type: "area",
					markerSize: 0,
					dataPoints: heartrate,
				},
				{
					name: "Temperature",
					showInLegend: true,
					color: "rgba(40,175,101,0.40)",

					markerSize: 0,
					dataPoints: temperature,
				},
			],
		};

		return (
			<div id="chartContainer" style={{ height: 360 + "px", width: 100 + "%" }}>
				<CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
			</div>
		);
	}
}

export default Chart;
