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
			const promise = this.event.promise();
			if (!(promise instanceof Promise)) {
				throw Error('need a promise');
			}
			console.log('promise', promise);
			promise.then(() => {
				console.log('promise ended with success.');
				this.button.disabled = false;
			}).catch(() => {
				console.log('promise ended with error.');
				this.button.disabled = false;
			});
		}
	}

	PromiseButton.reg;
})();