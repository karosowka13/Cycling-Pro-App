import React, { Component } from "react";

import { formatTime } from "../../helpers/Training";
import CanvasJSReact from "./canvasjs.react";

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
			width: 700,
			axisY: [
				{
					minimum: 0,
					title: "HR",
					tickColor: "rgba(196, 24, 47,0.46)",
					labelFontColor: "rgba(196, 24, 47,0.46)",
					gridThickness: 0,
				},
				{
					minimum: 0,
					title: "Power",
					tickColor: "rgba(37, 124, 186,0.7)",
					labelFontColor: "rgba(37, 124, 186,0.7)",
					gridThickness: 0,
				},
				{
					title: "Cadence",
					tickColor: "rgba(34, 130, 37,0.50)",
					labelFontColor: "rgba(34, 130, 37,0.50)",
					gridThickness: 0,
				},
			],
			axis2Y: [
				{
					title: "Temperature",
					tickColor: "rgba(70,175,101,0.50)",
					labelFontColor: "rgba(70,175,101,0.50)",
					gridThickness: 0,
				},
				{
					minimum: 0,
					title: "Speed",
					tickColor: "rgba(227, 224, 48)",
					labelFontColor: "rgba(227, 224, 48)",
					gridThickness: 0,
				},
				{
					minimum: 0,
					title: "Altitiude",
					tickColor: "rgba(94, 102, 107,0.40)",
					labelFontColor: "rgba(94, 102, 107,0.40)",
					gridThickness: 0,
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
					name: "Power",
					axisYIndex: 1,
					type: "stackedArea",
					color: "rgba(37, 124, 186,0.7)",
					markerSize: 0,
					dataPoints: power,
				},
				{
					showInLegend: true,
					name: "Altitude",
					type: "splineArea",
					color: "rgba(94, 102, 107,0.40)",
					axisYType: "secondary",
					axisYIndex: 2,
					markerSize: 0,
					dataPoints: altitude,
				},
				{
					showInLegend: true,
					name: "Speed",
					color: "rgba(227, 224, 48)",
					type: "spline",
					axisYType: "secondary",
					axisYIndex: 1,
					markerSize: 0,
					dataPoints: speed,
				},
				{
					showInLegend: true,
					name: "Cadence",
					axisYIndex: 2,
					color: "rgba(34, 130, 37,0.50)",
					type: "stackedArea",
					markerSize: 0,
					dataPoints: cadence,
				},
				{
					showInLegend: true,
					name: "Heart rate",
					axisYIndex: 0,
					color: "rgba(196, 24, 47,0.46)",
					type: "spline",
					markerSize: 0,
					dataPoints: heartrate,
				},
				{
					showInLegend: true,
					name: "Temperature",
					type: "spline",
					color: "rgba(70,175,101,0.50)",
					axisYType: "secondary",
					axisYIndex: 3,
					markerSize: 0,
					dataPoints: temperature,
				},
			],
		};

		return (
			<div
				id="chartContainer"
				style={{ height: 400 + "px", width: 100 + "%", position: "relative" }}
			>
				<CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
			</div>
		);
	}
}

export default Chart;
