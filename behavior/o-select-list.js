(function () {
    'use strict';
    class OSelectList extends circle.Behavior {

        onDigest(key) {
            this.render();
        }

        render() {
            console.log('OSelectList render', this);
            if (!(this.host.model[this.key] && this.host.model[this.key].length !== undefined)) {
                return;
            }
			this.host.model[this.key].forEach((d) => {
				const option = document.createElement('option');
				option.text = d;
				this.elt.add(option);
			});
        }
    }
    OSelectList.register();
})();