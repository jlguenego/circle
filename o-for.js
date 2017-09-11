(function () {
	'use strict';

	// Unfortunately, custom built-in element are not yet implemented.

	class OFor extends circle.Element {

		connectedCallback() {
			super.connectedCallback();
			const originalTemplate = this.querySelector('template');
			if (originalTemplate) {
				this.originalContent = document.importNode(originalTemplate.content, true);
			}
		}

		render(digestId) {
			console.log('about to render o-for', this);
			const iterator = this.model.iterator;
			console.log('iterator', iterator);
			if (iterator === undefined) {
				return;
			}
			const array = this.model.list || [];
			console.log('array', array);
			let html = '';
			console.log('new length: ', array.length);
			for (let i = 0; i < array.length; i++) {
				html += `<o-for-item  index="${i}" ${iterator}="[list[${i}]]"></o-for-item>`;

			}

			this.root.innerHTML = html;
		}
	}

	OFor.register();

	class OForItem extends circle.Element {

		constructor() {
			super();
			console.log('o-for-item constructor');
		}

		connectedCallback() {
			console.log('o-for-item connectedCallback');
			super.connectedCallback();
		}

		render(digestId) {
			console.log('about to render o-for-item');
			const clone = document.importNode(this.getParent().originalContent, true);
			this.parseExpr(clone);
			this.root.innerHTML = '';
			this.root.appendChild(clone);
		}

		get index() {
			return this.model.index;
		}
	}

	OForItem.register();
})();
