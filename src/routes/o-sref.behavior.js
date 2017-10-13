(function () {
    'use strict';

    class OSref extends o.Behavior {

        init() {
            const routes = o.di('routes');
            let name = this.value;
            if (this.key) {
                name = this.host.getModel(this.key);
            }
            const state = routes.states.find(n => n.name === name);
            if (!state) {
                throw new Error('cannot find state with name ', name);
            }
            this.elt.addEventListener('click', function (event) {
                event.preventDefault();
                routes.goto(state);
            });
            this.elt.style.cursor = 'pointer';
        }

        onDigest(key) {
            this.render();
        }

        render() {
            console.log('sref render');
            let value = this.value;
            if (this.key) {
                console.log('this.key', this.key);
                value = this.host.getModel(this.key);
            }
            this.elt.setAttribute('href', value);
        }
    }
    OSref.reg();
})();