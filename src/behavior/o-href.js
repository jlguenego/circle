(function () {
    'use strict';
    console.log('ohref decl');

    class OHref extends o.Behavior {

        init() {
            const behavior = this;
            this.elt.addEventListener('click', function (event) {
                window.history.pushState('object or string', 'title', behavior.host.getModel(behavior.key));
                event.preventDefault();
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