(function () {
	'use strict';

	class StarInput extends o.Element {

		render() {
			let note = +this.model.note || 0;
			note = (note > 5) ? 5 : note;
			note = (note < 0) ? 0 : note;

			let html = `
<style>
	jlg-stars {
		display: block;
	}			
	:host {
		display: block;
	}
</style>
			`;
			for (let i = 0; i < note; i++) {
				let update = `onclick="o(this).update(${i + 1})"`;
				if ('ontouchstart' in document.documentElement) {
					update += ` ontouchstart="o(this).update(${i + 1})"`;
				}
				html += `<img ${update} src="../img/yellow_star.png">`;
			}

			for (let i = note; i < 5; i++) {
				let update = `onclick="o(this).update(${i + 1})"`;
				if ('ontouchstart' in document.documentElement) {
					update += ` ontouchstart="o(this).update(${i + 1})"`;
				}
				html += `<img ${update} src="../img/white_star.png">`;
			}
			this.root.innerHTML = html;
		}

		update(newNote) {
			this.model.note = newNote;
		}

	}

	StarInput.reg();
})();