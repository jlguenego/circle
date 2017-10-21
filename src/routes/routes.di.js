(function() {
	'use strict';

	function toLabel(str) {
		return str.replace(/(-[a-z])/g, function($1) { return $1.toUpperCase().replace('-', ' '); })
			.replace(/^(.)/, function($1) { return $1.toUpperCase(); });
	}

	class Routes {
		constructor() {
			this.states = [];
		}

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
			window.onpopstate = function(e) {
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

		push(...states) {
			console.log('states', states);
			for (let state of states) {
				if (typeof state === 'string') {
					state = {
						name: state,
					};
				}
				state.label = state.label || toLabel(state.name);
				state.url = state.url || './' + state.name;
				state.component = state.component || state.name + '-route';
				this.states.push(state);
			}
		}

	}
	o.di('routes', new Routes());

})();
