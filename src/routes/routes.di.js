(function() {
	'use strict';

	class Routes {
		states(states) {
			this.states = states;
		}

		register(elt) {
			this.elt = elt;
			const component = this.states.find(n => n.default === true).component;
			this.elt.root.innerHTML = '';
            this.elt.root.appendChild(document.createElement(component));
		}

		onClick(event, url) {
			window.history.pushState('object or string', 'title', url);
			event.preventDefault();
			const component = this.states.find(n => n.url === url).component;
			this.elt.root.innerHTML = '';
            this.elt.root.appendChild(document.createElement(component));
		}

		
	}
	o.di('routes', new Routes());

})();
