(function () {
	'use strict';

	class OChoice extends circle.Element {
		connectedCallback() {
			super.connectedCallback();
			this.root.innerHTML = '<select></select>';
			this.select = this.root.querySelector('select');
			this.select.addEventListener('change', () => {
				this.model.value = this.select.value;
			});
		}
		render() {
			if (this.model.choices === undefined) {
				return;
			}
			this.model.choices.forEach((d) => {
				const option = document.createElement('option');
				option.text = d;
				this.select.add(option);
			});
			this.select.value = this.model.value;
		}
	}
	OChoice.register();
})();
