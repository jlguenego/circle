(function () {
	'use strict';

	class Routes {
		states(states) {
			this.states = states;
		}

		sync() {
			const currentUrl = window.location.href;
			let state = this.states.find(n => currentUrl.endsWith(n.url.substring(1)));
			if (state) {
				const baseElt = document.createElement('base');
				baseElt.setAttribute('href', currentUrl);
				document.head.insertBefore(baseElt, document.head.childNodes[0]);
				
			} else {
				state = this.states.find(n => n.default === true);
				window.history.replaceState(state, state.name, state.url);
			}
			this.elt.root.innerHTML = '';
			this.elt.root.appendChild(document.createElement(state.component));
		}

		register(elt) {
			this.elt = elt;

			this.sync();

			const service = this;
			window.onpopstate = function (e) {
				console.log('onpopstate', arguments);
				const state = e.state;
				if (state) {
					service.elt.root.innerHTML = '';
					service.elt.root.appendChild(document.createElement(state.component));
				} else {
					service.sync();
				}
			};
		}

		goto(url) {
			const state = this.states.find(n => n.url === url);
			window.history.pushState(state, state.name, url);
			this.elt.root.innerHTML = '';
			this.elt.root.appendChild(document.createElement(state.component));
		}

	}
	o.di('routes', new Routes());

})();
