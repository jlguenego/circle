(function () {
	'use strict';

	class Routes {
		states(states) {
			this.states = states;
		}

		register(elt) {
			this.elt = elt;

			const currentUrl = window.location.href;
			console.log('currentUrl', currentUrl);
			let state = this.states.find(n => currentUrl.endsWith(n.url.substring(1)));
			if (state) {
				const baseElt = document.createElement('base');
				baseElt.setAttribute('href', currentUrl);
				document.head.insertBefore(baseElt, document.head.childNodes[0]);
				this.elt.root.innerHTML = '';
				this.elt.root.appendChild(document.createElement(state.component));
			}
			if (!state) {
				state = this.states.find(n => n.default === true);
				this.goto(state.url);
			}
			if (!state) {
				return;
			}

			
		}

		goto(url) {
			window.history.pushState('object or string', 'title', url);
			const state = this.states.find(n => n.url === url);
			this.elt.root.innerHTML = '';
			this.elt.root.appendChild(document.createElement(state.component));
		}

	}
	o.di('routes', new Routes());

})();
