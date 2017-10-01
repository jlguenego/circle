(function () {
    'use strict';

    class OHref extends o.Behavior {

        init() {
            const behavior = this;
            const url = behavior.host.getModel(behavior.key);
            console.log('url', url);
            this.elt.addEventListener('click', function (event) {
                event.preventDefault();
                const routes = o.di('routes');
                routes.goto(url);
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