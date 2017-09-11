(function() {
	'use strict';

	class Http {
		send(config) {
			return new Promise((resolve, reject) => {
				var xhr = new XMLHttpRequest();
				xhr.open(config.method, config.url);
				xhr.onload = function() {
					if (this.status >= 200 && this.status < 300) {
						const response = {};
						let json;
						try {
							json = JSON.parse(xhr.response);
						} catch (e) {
							json = undefined;
						}
						if (json === undefined) {
							response.data = xhr.response;
						} else {
							response.data = json;
						}

						resolve(response);
					} else {
						reject({
							config,
							status: this.status,
							statusText: xhr.statusText
						});
					}
				};
				xhr.onerror = function() {
					reject({
						config,
						status: this.status,
						statusText: xhr.statusText
					});
				};
				if (config.headers) {
					for (const prop in config.headers) {
						xhr.setRequestHeader(prop, config.headers[prop]);
					}
				}
				let params = config.params;
				// We'll need to stringify if we've been given an object
				// If we have a string, this is skipped.
				if (params && typeof params === 'object') {
					params = Object.keys(params).map(function(key) {
						return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
					}).join('&');
				}
				xhr.send(params);
			});
		}

		get(url) {
			return this.send({
				method: 'GET',
				url
			});
		}
	}
	const http = new Http();
	circle.set('http', http);

})();
