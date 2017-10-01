(function() {
	'use strict';

	class Routes {
		states(states) {
			this.states = states;
		}

		register(elt) {
			this.elt = elt;

			const currentUrl = document.baseURI;
			console.log('currentUrl', currentUrl);
			let state = this.states.find(n => currentUrl.endsWith(n.url.substring(1)));
			if (!state) {
				state = this.states.find(n => n.default === true).component;
			}
			if (!state) {
				return;
			}
			
			this.elt.root.innerHTML = '';
            this.elt.root.appendChild(document.createElement(state.component));
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
