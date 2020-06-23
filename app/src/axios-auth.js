import axios from "axios";

// Default config options
const defaultOptions = {
	headers: {
		"Content-Type": "application/json",
	},
};

// Create instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
	const token = localStorage.getItem("token");
	config.headers.token = token ? token : "";
	return config;
});
export default instance;
