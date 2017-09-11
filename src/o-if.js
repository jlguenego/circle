(function() {
	'use strict';

	class OIf extends circle.Element {
		render(digestId) {
			this.root.innerHTML = (this.model.cond) ? '<slot></slot>' : '';
		}
	}
	OIf.register();
})();
