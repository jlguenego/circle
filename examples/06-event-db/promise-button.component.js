(function () {
	'use strict';

	class PromiseButton extends circle.Element {
		connectedCallback() {
			super.connectedCallback();
			this.button = this.root.querySelector('button');
		}
		runPromise() {
			console.log('button clicked, start promise');
			this.button.disabled = true;
			const promiseExpr = this.getAttribute('promise');
			const promise = eval(promiseExpr);
			if (!(promise instanceof Promise)) {
				throw Error('need a promise');
			}
			promise.then(() => {
				console.log('promise ended.');
				this.button.disabled = false;
			});
		}
	}

	PromiseButton.reg;
})();