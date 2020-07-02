import React, { Component } from "react";

import { formatTime, compare_time } from "../../../helpers/Training";
import CanvasJSReact from "./canvasjs.react";

import classes from "./chart.module.css";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
	render() {
		let data = this.props.records;
		let power = [];
		let altitude = [];
		let speed = [];
		let cadence = [];
		let heartrate = [];
		let temperature = [];
		let options = null;
		let Altitude = [];
		data.sort(compare_time);
		if (data.length > 0) {
			for (let record of data) {
				Altitude.push(record.altitude);

				power.push({ x: record.elapsed_time, y: record.power });
				altitude.push({ x: record.elapsed_time, y: record.altitude });
				speed.push({ x: record.elapsed_time, y: record.speed });
				cadence.push({ x: record.elapsed_time, y: record.cadence });
				heartrate.push({ x: record.elapsed_time, y: record.heart_rate });
				temperature.push({ x: record.elapsed_time, y: record.temperature });
			}
			let minAltitude = Math.min(...Altitude);
			options = {
				exportFileName: `Training ${data[0].timestamp}`,
				exportEnabled: true,
				theme: "light2",
				animationEnabled: true,
				zoomEnabled: true,
				width: 600,
				axisY: [
					{
						//heart rate
						minimum: 0,
						tickColor: "rgba(196, 24, 47)",
						labelFontColor: "rgba(196, 24, 47)",
						gridThickness: 0,
						margin: 0,
						labelFontSize: 10,
					},
					{
						//power
						minimum: 0,
						tickColor: "rgba(37, 124, 186)",
						labelFontColor: "rgba(37, 124, 186)",
						gridThickness: 0,
						margin: 0,
						labelFontSize: 10,
					},
					{
						//cadence
						minimum: 0,
						tickColor: "rgba(34, 130, 37)",
						labelFontColor: "rgba(34, 130, 37)",
						gridThickness: 0,
						margin: 0,
						labelFontSize: 10,
					},
				],
				axisY2: [
					{
						//ascent
						viewportMinimum: minAltitude,
						lineColor: "rgba(94, 102, 107)",
						titleFontColor: "rgba(94, 102, 107)",
						labelFontColor: "rgba(94, 102, 107)",
						margin: 0,
						labelFontSize: 10,
					},
					{
						//temperature
						lineColor: "rgba(86, 15, 145)",
						titleFontColor: "rgba(86, 15, 145)",
						labelFontColor: "rgba(86, 15, 145)",
						margin: 0,
						labelFontSize: 10,
					},
					{
						//speed
						lineColor: "rgba(227, 224, 48)",
						titleFontColor: "rgba(227, 224, 48)",
						labelFontColor: "rgba(227, 224, 48)",
						margin: 0,
						labelFontSize: 10,
					},
				],
				axisX: {
					labelFormatter: function (e) {
						return formatTime(e.value);
					},
					minimum: 0,
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",

					cursor: "pointer",
					itemclick: function (e) {
						if (
							typeof e.dataSeries.visible === "undefined" ||
							e.dataSeries.visible
						) {
							e.dataSeries.visible = false;
						} else {
							e.dataSeries.visible = true;
						}
						e.chart.render();
					},
				},
				toolTip: {
					shared: true,
				},
				data: [
					{
						showInLegend: true,
						legendMarkerType: "circle",
						name: "Heart rate",
						color: "rgba(196, 24, 47,0.75)",
						type: "spline",

						markerSize: 0,
						dataPoints: heartrate,
					},
					{
						legendMarkerType: "circle",
						showInLegend: true,
						name: "Power",
						axisYIndex: 1,
						type: "spline",
						color: "rgba(37, 124, 186,0.9)",

						markerSize: 0,
						dataPoints: power,
					},
					{
						showInLegend: true,
						legendMarkerType: "circle",
						name: "Cadence",
						axisYIndex: 2,
						color: "rgba(34, 130, 37,0.7)",
						type: "spline",

						markerSize: 0,
						dataPoints: cadence,
					},
					{
						showInLegend: true,
						legendMarkerType: "circle",
						name: "Altitude",
						type: "area",
						color: "rgba(94, 102, 107,0.40)",
						axisYType: "secondary",

						markerSize: 0,
						dataPoints: altitude,
					},
					{
						showInLegend: true,
						legendMarkerType: "circle",
						name: "Temperature",
						type: "spline",
						color: "rgba(86, 15, 145,0.90)",
						axisYType: "secondary",
						axisYIndex: 2,

						markerSize: 0,
						dataPoints: temperature,
					},
					{
						showInLegend: true,
						legendMarkerType: "circle",
						name: "Speed",
						color: "rgba(227, 224, 7)",
						type: "spline",
						axisYType: "secondary",
						axisYIndex: 1,

						markerSize: 0,
						dataPoints: speed,
					},
				],
			};
		}
		return (
			<div id="chartContainer" className={classes.Chart}>
				<CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
			</div>
		);
	}
}

export default Chart;
