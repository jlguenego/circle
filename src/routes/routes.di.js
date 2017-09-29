(function() {
	'use strict';

	class Routes {
		config(config) {
			this.config = config;
		}

		register(elt) {
			this.elt = elt;
		}

		onClick(event, url) {
			window.history.pushState('object or string', 'title', url);
			event.preventDefault();
			const component = this.config.find(n => n.url === url).component;
			this.elt.root.innerHTML = '';
            this.elt.root.appendChild(document.createElement(component));
		}

		
	}
	o.di('routes', new Routes());

})();
