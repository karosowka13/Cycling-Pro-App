import React, { Component } from "react";
import { centerGeolocation } from "../../../helpers/Training";
import { Map, Polyline, TileLayer } from "react-leaflet";
import classes from "./Map.module.css";
class routeMap extends Component {
	render() {
		let polyline = [];

		for (let point of this.props.coordinates) {
			polyline.push([point.position_lat, point.position_long]);
		}
		let center = centerGeolocation(polyline);

		return (
			<div className={classes.Map}>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>

				<Map
					style={{ height: "300px", width: "500px" }}
					center={center}
					zoom={12}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Polyline color="#1a90ffe8" positions={polyline} />
				</Map>
			</div>
		);
	}
}
export default routeMap;
