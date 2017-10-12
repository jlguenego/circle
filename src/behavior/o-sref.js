(function () {
    'use strict';

    class OSref extends o.Behavior {

        init() {
            const routes = o.di('routes');
            const name = this.host.getModel(this.key);
            const state = routes.states.find(n => n.name === name);
            this.elt.addEventListener('click', function (event) {
                event.preventDefault();
                routes.goto(state);
            });
        }

        onDigest(key) {
            this.render();
        }

        render() {
            this.elt.setAttribute('href', this.host.getModel(this.key));
        }
    }
    OSref.reg();
})();