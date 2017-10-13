(function () {
    'use strict';
    class OSrc extends o.Behavior {
        onDigest(key) {
            this.render();
        }
        render() {
            if (this.host.hasModel(this.key)) {
                this.elt.setAttribute('src', this.host.getModel(this.key));
            }
        }
    }
    OSrc.reg();
})();