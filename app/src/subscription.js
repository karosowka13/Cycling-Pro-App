const convertedVapidKey = urlBase64ToUint8Array(
	process.env.REACT_APP_PUBLIC_VAPID_KEY
);

function sendSubscription(subscription) {
	return fetch(
		`${process.env.REACT_APP_SERVER}/athletes/:athleteid/statistics/subscribeTSS`,
		{
			method: "POST",
			body: JSON.stringify(subscription),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}

export function subscribeUser() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then(function (registration) {
				if (!registration.pushManager) {
					console.log("Push manager unavailable.");
					return;
				}

				registration.pushManager
					.getSubscription()
					.then(function (existedSubscription) {
						if (existedSubscription === null) {
							console.log("No subscription detected, make a request.");
							registration.pushManager
								.subscribe({
									applicationServerKey: convertedVapidKey,
									userVisibleOnly: true,
								})
								.then(function (newSubscription) {
									console.log("New subscription added.");
									sendSubscription(newSubscription);
								})
								.catch(function (e) {
									if (Notification.permission !== "granted") {
										console.log("Permission was not granted.");
									} else {
										console.error(
											"An error ocurred during the subscription process.",
											e
										);
									}
								});
						} else {
							console.log("Existed subscription detected.");
							sendSubscription(existedSubscription);
						}
					});
			})
			.catch(function (e) {
				console.error(
					"An error ocurred during Service Worker registration.",
					e
				);
			});
	}
}
