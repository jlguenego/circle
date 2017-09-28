(function () {
    'use strict';
    console.log('ohref decl');
    
    class OHref extends o.Behavior {

        onDigest(key) {
            this.render();
        }

        render() {
            this.elt.setAttribute('href', this.host.getModel(this.key));
        }
    }
    OHref.reg;
})();