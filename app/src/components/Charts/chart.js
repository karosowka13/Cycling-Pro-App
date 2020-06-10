import React, { Component } from "react";

import { formatTime } from "../../helpers/Training";
import CanvasJSReact from "./canvasjs.react";

import classes from "./chart.module.css"
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
			power.push({ x: record.elapsed_time, y: record.power });
			altitude.push({ x: record.elapsed_time, y: record.altitude });
			speed.push({ x: record.elapsed_time, y: record.speed });
			cadence.push({ x: record.elapsed_time, y: record.cadence });
			heartrate.push({ x: record.elapsed_time, y: record.heart_rate });
			temperature.push({ x: record.elapsed_time, y: record.temperature });
		}

		let options = {
			exportFileName: `Training ${data[0].timestamp}`,
			exportEnabled: true,
			theme: "light2",
			animationEnabled: true,
			zoomEnabled: true,
			width: 1000,
			axisY: [
				{
					//heart rate
					minimum: 0,
					tickColor: "rgba(196, 24, 47,0.46)",
					labelFontColor: "rgba(196, 24, 47,0.46)",
					gridThickness: 0,
				},
				{
					//power
					minimum: 0,
					tickColor: "rgba(37, 124, 186,0.7)",
					labelFontColor: "rgba(37, 124, 186,0.7)",
					gridThickness: 0,
				},
				{
					//cadence
					minimum: 0,
					tickColor: "rgba(34, 130, 37,0.50)",
					labelFontColor: "rgba(34, 130, 37,0.50)",
					gridThickness: 0,
				},
			],
			axisY2: [
				{
					//ascent
					viewportMinimum: 0,
					lineColor: "rgba(94, 102, 107)",
					titleFontColor: "rgba(94, 102, 107)",
					labelFontColor: "rgba(94, 102, 107)",
				},
				{
					//temperature
					lineColor: "rgba(70,175,101)",
					titleFontColor: "rgba(70,175,101)",
					labelFontColor: "rgba(70,175,101)",
				},
				{
					//speed
					lineColor: "rgba(227, 224, 48)",
					titleFontColor: "rgba(227, 224, 48)",
					labelFontColor: "rgba(227, 224, 48)",
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
					name: "Heart rate",
					color: "rgba(196, 24, 47,0.46)",
					type: "spline",
					legendMarkerType: "circle",
					markerSize: 0,
					dataPoints: heartrate,
				},
				{
					showInLegend: true,
					name: "Power",
					axisYIndex: 1,
					type: "spline",
					color: "rgba(37, 124, 186,0.7)",
					legendMarkerType: "circle",
					markerSize: 0,
					dataPoints: power,
				},
				{
					showInLegend: true,
					name: "Cadence",
					axisYIndex: 2,
					color: "rgba(34, 130, 37,0.50)",
					type: "spline",
					legendMarkerType: "circle",
					markerSize: 0,
					dataPoints: cadence,
				},
				{
					showInLegend: true,
					name: "Altitude",
					type: "area",
					color: "rgba(94, 102, 107,0.40)",
					axisYType: "secondary",
					legendMarkerType: "cross",
					legendMarkerType: "circle",
					markerSize: 0,
					dataPoints: altitude,
				},
				{
					showInLegend: true,
					name: "Temperature",
					type: "spline",
					color: "rgba(70,175,101,0.50)",
					axisYType: "secondary",
					axisYIndex: 2,
					legendMarkerType: "circle",
					markerSize: 0,
					dataPoints: temperature,
				},
				{
					showInLegend: true,
					name: "Speed",
					color: "rgba(227, 224, 48)",
					type: "spline",
					axisYType: "secondary",
					axisYIndex: 1,
					legendMarkerType: "circle",
					markerSize: 0,
					dataPoints: speed,
				},
			],
		};

		return (
			<div
				id="chartContainer"
				className={classes.Chart}
			>
				<CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
			</div>
		);
	}
}

export default Chart;
