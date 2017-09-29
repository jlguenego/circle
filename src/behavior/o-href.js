(function () {
    'use strict';
    console.log('ohref decl');

    class OHref extends o.Behavior {

        init() {
            const behavior = this;
            this.elt.addEventListener('click', function (event) {
                const url = behavior.host.getModel(behavior.key);
                
                const routes = o.di('routes');
                routes.onClick(event, url);
                
            });
        }

        onDigest(key) {
            this.render();
        }

        render() {
            this.elt.setAttribute('href', this.host.getModel(this.key));
        }
    }
    OHref.reg;
})();