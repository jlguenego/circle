(function() {
	'use strict';

	class DJ {
		constructor(element, selector) {
			this.element = element;
			this.selector = selector;
			this.updateElement = function() {};
			this.itemCmp = (n, item) => n === item;
		}

		/**
		 * update the array of <data-join> that is joined to the DOM.
		 * 
		 * Step 1: remove the elements that will not appear in the new array
		 * or that need to be moved in a lower index.
		 * 
		 * @param {any} array 
		 * @returns 
		 * @memberof DJ
		 */
		update(array) {
			// even if element are removed, this array will not be impacted.
			const elts = this.element.querySelectorAll(this.selector);
			let lastIndex = -1;
			const intersection = [];
			for (let elt of elts) {
				const item = elt.$data$.item;
				const index = array.findIndex((n, i) => i > lastIndex && this.itemCmp(n, item));
				if (index === -1) {
					// not found case
					this.exit(elt).then(() => {
						this.element.removeChild(elt);
					});
				} else {
					// found case: keep the element in the intersect array
					elt.$data$ = { item, index };
					intersection.push(elt.$data$);
					lastIndex = index;
					this.updateElement(elt);
				}
			}

			const newItems = array
				.map((item, index) => { return { item, index }; })
				.filter(obj => {
					return !intersection.find(x => this.itemCmp(x.item, obj.item) && x.index === obj.index);
				});
			let i = 0;
			newItems.forEach(obj => {
				let currentElt = elts[i];
				while (currentElt && currentElt.$data$.index < obj.index) {
					i++;
					currentElt = elts[i];
				}
				const elt = this.addNewElement(obj);
				elt.$data$ = obj;
				if (currentElt) {
					this.element.insertBefore(elt, currentElt);
				} else {
					this.element.appendChild(elt);
				}
				this.enter(elt).then(() => {});
			});
			return this;
		}

		/**
		 * Specify the promise to be run just before a <data-join> being removed.
		 * 
		 * @param {any} promise 
		 * @returns 
		 * @memberof DJ
		 */
		onExit(promise) {
			this.exit = promise;
			return this;
		}

		/**
		 * Specify the promise to be run just before a <data-join> being added.
		 * 
		 * @param {any} promise 
		 * @returns 
		 * @memberof DJ
		 */
		onEnter(promise) {
			this.enter = promise;
			return this;
		}

		onAddNewElement(addNewElement) {
			this.addNewElement = addNewElement;
			return this;
		}

		onUpdateElement(updateElement) {
			this.updateElement = updateElement;
			return this;
		}
	}

	window.DJ = DJ;

})();
