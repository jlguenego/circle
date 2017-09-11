(function () {
	'use strict';

	class HelloWorld extends HTMLElement {
		constructor() {
			super();
			console.log('HelloWorld constructor');
			const shadowRoot = this.attachShadow({
				mode: 'open'
			});
			shadowRoot.innerHTML = '<h1>Hello World</h1>';
		}
	}

	window.customElements.define('hello-world', HelloWorld);
})();