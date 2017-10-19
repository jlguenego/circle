(function () {
	'use strict';

	class PromiseButton extends o.Element {
		init() {
			this.button = this.root.querySelector('button');
		}
		
		runPromise() {
			console.log('button clicked, start promise (button disable)');
			this.button.disabled = true;
			const promise = this.event.promise();
			if (!(promise instanceof Promise)) {
				throw Error('need a promise');
			}
			promise.then(() => {
				console.log('promise ended with success. (button enable)');
				this.button.disabled = false;
			}).catch(() => {
				console.log('promise ended with error. (button enable)');
				this.button.disabled = false;
			});
		}
	}

	PromiseButton.reg();
})();