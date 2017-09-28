(function() {
	'use strict';

	class ORoute extends o.Element {

		init() {
			const config = o.di('routes').config;
			console.log('config', config);
		}
		render() {
			this.root.innerHTML = 'coucou';
		}
	}
	ORoute.reg;
})();
