/** utils. put it in different file */
const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === "[::1]" ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
);

// Check that service workers are supported
if ("serviceWorker" in navigator) {
	// Use the window load event to keep the page load performant
	window.addEventListener("load", () => {
		if (isLocalhost) {
			// loading custom service worker from local relative path to serviceWorker.js from localhost
			navigator.serviceWorker.register("./custom-sw.js");
		} else {
			navigator.serviceWorker.register("/custom-sw.js");
		}
	});
	setTimeout(function () {
		navigator.serviceWorker.ready
			.then(async function (registration) {
				const subscription = await registration.pushManager.getSubscription();
				if (subscription) {
					return subscription;
				}
				const vapidPublicKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
				const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
				return registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: convertedVapidKey,
				});
			})
			.then(function (subscription) {
				fetch(
					`${process.env.REACT_APP_SERVER}/athletes/${localStorage.getItem(
						"userId"
					)}/statistics/subscribeTSS`,
					{
						method: "POST",
						body: JSON.stringify(subscription),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
			})
			.catch((err) => console.error("Push subscription error: ", err));
	}, 60000); //1min
}

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	// eslint-disable-next-line
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
