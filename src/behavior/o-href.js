(function () {
    'use strict';
    console.log('ohref decl');
    
    class OHref extends o.Behavior {

        constructor(elt) {
            super(elt);
            console.log('ohref constr');
        }

        onDigest(key) {
            console.log('ohref');
            this.render();
        }

        render() {
            this.elt.setAttribute('href', 'hello');
        }
    }
    OHref.reg;
})();