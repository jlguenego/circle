(function () {
	'use strict';

	class Routes {

		setState(state) {
			this.elt.root.innerHTML = '';
			this.elt.root.appendChild(document.createElement(state.component));
			console.log('setting current state to ', state);
			this.elt.model.currentState = state;
			document.title = this.title + ' - ' + state.label;
			return this;
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
			this.setState(state);
		}

		register(elt) {
			this.elt = elt;
			this.sync();
			const service = this;
			window.onpopstate = function (e) {
				console.log('onpopstate', arguments);
				const state = e.state;
				if (state) {
					service.setState(state);
				} else {
					service.sync();
				}
			};
		}

		goto(state) {
			window.history.pushState(state, state.name, state.url);
			this.setState(state);
		}

	}
	o.di('routes', new Routes());

})();
