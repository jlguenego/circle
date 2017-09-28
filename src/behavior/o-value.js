(function () {
    'use strict';
    class OValue extends o.Behavior {
        constructor(elt) {
            super(elt);
            this.elt.addEventListener('input', () => {
                this.host.setModel(this.key, this.elt.value);
            });
            if (this.elt.form) {
                this.elt.form.addEventListener('reset', () => {
                    this.host.setModel(this.key, '');
                });
            }
        }

        init() {
            if (!this.host.hasModel(this.key)) {
                this.host.setModel(this.key, this.elt.value);
            }
        }

        onDigest(key) {
            this.render();
        }

        render() {
            this.elt.value = this.host.getModel(this.key) || '';
        }
    }
    OValue.reg;
})();