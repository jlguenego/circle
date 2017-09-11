(function () {
    'use strict';
    class OShow extends circle.Behavior {

        onDigest(key) {
            this.render();
        }

        render() {
            const show = this.host.model[this.key];
            if (show) {
                this.elt.classList.remove('o-hide');
            } else {
                this.elt.classList.add('o-hide');
            }
        }
    }
    OShow.register();
})();