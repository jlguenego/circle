(function() {
	'use strict';

	class Routes {
		config(config) {
			console.log('setting routes config');
			this.config = config;
		}

		register(elt) {
			this.elt = elt;
		}

		onClick(event, url) {
			console.log('onClick', event);
			window.history.pushState('object or string', 'title', url);
			event.preventDefault();
			const component = this.config.find(n => n.url === url).component;
			console.log('component', component);
			this.elt.root.innerHTML = 'asdf';
            this.elt.root.appendChild(document.createElement(component));
		}

		
	}
	o.di('routes', new Routes());

})();
