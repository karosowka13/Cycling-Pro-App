self.addEventListener("install", (event) =>
	event.waitUntil(self.skipWaiting())
);

self.addEventListener("push", (event) => {
	const message = event.data.json();
	const { title } = message;
	let options = {
		body: message.body,
		badge: "Logo96.png",
		icon: "Logo96.png",
		vibrate: [500, 100, 500],
	};
	/* The showNotification method is available on the registration object of the service worker.
			The first parameter to showNotification method is the title of notification, and the second parameter is an object */
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("activate", (event) => {
	let cacheWhitelist = ["products-v2"]; // products-v2 is the name of the new cache

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					/* Deleting all the caches except the ones that are in cacheWhitelist array */
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// /* Fetch event handler for responding to GET requests with the cached assets */
// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		caches.open("products-v2").then(async (cache) => {
// 			/* Checking if the request is already present in the cache. If it is present, sending it directly to the client */
// 			const response = await cache.match(event.request);
// 			if (response) {
// 				console.log(
// 					"Cache hit! Fetching response from cache",
// 					event.request.url
// 				);
// 				return response;
// 			}
// 			/* If the request is not present in the cache, we fetch it from the server and then put it in cache for subsequent requests. */
// 			fetch(event.request).then((response_1) => {
// 				cache.put(event.request, response_1.clone());
// 				return response_1;
// 			});
// 		})
// 	);
// });

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);
//content
workbox.routing.registerRoute(
	/\.(?:js|css|html|ico|json)$/,
	new workbox.strategies.NetworkFirst({
		cacheName: "images",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000,
			}),
		],
	})
);
// app-shell
workbox.routing.registerRoute(
	new RegExp("https:.*.png"),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "cache",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000,
			}),
		],
	})
);
workbox.routing.registerRoute(
	new RegExp("https:.*leaflet.css"),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "map",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000,
			}),
		],
	})
);
workbox.routing.registerRoute(
	new RegExp("^https://cycling-server-hrwkzvlbsa-ew.a.run.app/api"),
	new workbox.strategies.NetworkFirst({
		cacheName: "training",
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 31536000,
			}),
		],
	})
);

//after click redirect to application
// Notification click event listener
self.addEventListener("notificationclick", (e) => {
	// Close the notification popout
	e.notification.close();
	// Get all the Window clients
	e.waitUntil(
		clients.matchAll({ type: "window" }).then((clientsArr) => {
			// If a Window tab matching the targeted URL already exists, focus that;
			const hadWindowToFocus = clientsArr.some((windowClient) =>
				windowClient.url === "https://cycling-hrwkzvlbsa-ew.a.run.app"
					? (windowClient.focus(), true)
					: false
			);
			// Otherwise, open a new tab to the applicable URL and focus it.
			if (!hadWindowToFocus)
				clients
					.openWindow("https://cycling-hrwkzvlbsa-ew.a.run.app")
					.then((windowClient) => (windowClient ? windowClient.focus() : null));
		})
	);
});
