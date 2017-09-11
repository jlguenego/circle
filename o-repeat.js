(function() {
	'use strict';

	function createElementFromString(document, str) {
		const template = document.createElement('template');
		template.innerHTML = str;
		return template.content.firstChild;
	}

	class ORepeat extends circle.Element {

		initDJ() {
			const iterator = this.model.iterator;

			this.root.innerHTML = '';
			if (this.headerContent) {
				this.root.appendChild(this.headerContent);
			}
				
			this.dj = new window.DJ(this.root, 'o-repeat-item');
			this.dj.onExit(function(elt) {
				return new Promise((fulfill, reject) => {
					elt.className += 'leaving';
					setTimeout(() => {
						fulfill();
					}, 500);
				});
			});

			this.dj.onEnter(function(elt) {
				return new Promise((fulfill, reject) => {
					elt.className += 'entering';
					setTimeout(() => {
						elt.classList.remove('entering');
						fulfill();
					}, 500);
				});
			});

			this.dj.itemCmp = (i1, i2) => {
				for (let prop in i1) {
					if (i1[prop] !== i2[prop]) {
						return false;
					}
				}
				return true;
			};

			this.dj.onAddNewElement(function(obj) {
				const elt = createElementFromString(
					document,
					`<o-repeat-item iterator="${iterator}" 
						index="${obj.index}" 
						${iterator}="[list[${obj.index}]]"></o-repeat-item>`);

				return elt;
			});

			this.dj.onUpdateElement(function(elt) {
				const index = elt.$data$.index;
				elt.setAttribute('index', index);
				return elt;
			});
		}

		connectedCallback() {
			super.connectedCallback();
			if (this.hasAttribute('tmpl-header-selector')) {
				const originalTemplate = this.myDoc.querySelector(this.getAttribute('tmpl-header-selector'));
				if (originalTemplate) {
					this.headerContent = document.importNode(originalTemplate.content, true);
				}
			} else {
				const originalTemplate = this.querySelector('template[header]');
				if (originalTemplate) {
					this.headerContent = document.importNode(originalTemplate.content, true);
				}
			}

			if (this.hasAttribute('tmpl-item-selector')) {
				const originalTemplate = this.myDoc.querySelector(this.getAttribute('tmpl-item-selector'));
				if (originalTemplate) {
					this.originalContent = document.importNode(originalTemplate.content, true);
				}
			} else {
				const originalTemplate = this.querySelector('template[item]');
				if (originalTemplate) {
					this.originalContent = document.importNode(originalTemplate.content, true);
				}
			}
			this.initDJ();
		}

		render(digestId) {
			this.dj.update(this.model.list);
		}
	}

	ORepeat.register();

	class ORepeatItem extends circle.Element {

		static get observedAttributes() { return ['index']; }

		attributeChangedCallback(attr, oldValue, newValue) {
			if (attr === 'index') {
				this.model.index = newValue;
			}
		}

		render(digestId) {
			if (!this.alreadyWentHere) {
				this.alreadyWentHere = true;
				if (this.getParent().originalContent === undefined) {
					throw new Error('o-repeat: Cannot find the template');
				}
				const clone = document.importNode(this.getParent().originalContent, true);
				this.parseExpr(clone);
				this.root.innerHTML = '';
				this.root.appendChild(clone);
				return;
			}
		}

		get index() {
			return this.model.index;
		}
	}

	ORepeatItem.register();

})();
