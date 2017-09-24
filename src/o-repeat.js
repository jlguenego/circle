(function () {
	'use strict';

	function createElementFromString(document, str) {
		const template = document.createElement('template');
		template.innerHTML = str;
		return template.content.firstChild;
	}

	class ORepeat extends o.Element {

		initDJ() {
			const self = this;
			const iterator = this.model.iterator;

			this.root.innerHTML = '';
			if (this.headerContent) {
				this.root.appendChild(this.headerContent);
			}

			this.dj = new window.DJ(this.root, 'o-repeat-item');
			this.dj.onExit(function (elt) {
				return new Promise((fulfill, reject) => {
					elt.className += 'leaving';
					self.isBusy = true;
					setTimeout(() => {
						self.isBusy = false;
						fulfill();
					}, self.transitionTimeout);
				});
			});

			this.dj.onEnter(function (elt) {
				return new Promise((fulfill, reject) => {
					elt.className += 'entering';
					console.log('this', this);
					self.isBusy = true;
					setTimeout(() => {
						elt.classList.remove('entering');
						self.isBusy = false;
						fulfill();
					}, self.transitionTimeout);
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

			this.dj.onAddNewElement(function (obj) {
				const elt = createElementFromString(
					document,
					`<o-repeat-item iterator="${iterator}" 
						index="${obj.index}" 
						${iterator}="[list[${obj.index}]]"></o-repeat-item>`);

				return elt;
			});

			this.dj.onUpdateElement(function (elt) {
				const index = elt.$data$.index;
				setTimeout(() => {
					elt.setAttribute('index', index);
				}, self.transitionTimeout / 2);
				return elt;
			});
		}

		init() {
			this.isBusy = false;
			const transition = window.getComputedStyle(this).getPropertyValue('--o-transition').replace(/ms/, '');
			this.transitionTimeout = transition || 0;

			const tmpl = (this.hasAttribute('tmpl-header-selector')) ?
				this.myDoc.querySelector(this.getAttribute('tmpl-header-selector')) :
				this.querySelector('template[header]');
			if (tmpl) {
				this.headerContent = document.importNode(tmpl.content, true);
			}

			const tmpl2 = (this.hasAttribute('tmpl-item-selector')) ?
				this.myDoc.querySelector(this.getAttribute('tmpl-item-selector')) :
				this.querySelector('template[item]');
			if (tmpl2) {
				this.originalContent = document.importNode(tmpl2.content, true);
			}
			this.initDJ();
		}

		render(digestId) {
			if (!this.model.list) {
				return;
			}
			this.dj.update(this.model.list);
		}
	}

	ORepeat.reg;

	class ORepeatItem extends o.Element {

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

		delete() {
			if (this.getParent().isBusy) {
				return;
			}
			this.getParent().model.list.splice(this.model.index, 1);
		}
	}
	ORepeatItem.oa = ['index'];
	ORepeatItem.reg;

})();
