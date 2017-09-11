(function () {
    'use strict';
    class OValue extends circle.Behavior {
        constructor(elt) {
            super(elt);
            console.log('this.elt', this.elt);
            this.elt.addEventListener('input', () => {
                this.host.setModel(this.key, this.elt.value);
            });
            if (this.elt.form) {
                this.elt.form.addEventListener('reset', () => {
                    this.host.setModel(this.key, '');
                });
            }
        }

        onDigest(key) {
            this.render();
        }

        render() {
            this.elt.value = this.host.getModel(this.key) || '';
        }
    }
    OValue.register();
})();