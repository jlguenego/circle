(function () {
    'use strict';

    const CURRENT_STATE = '[\'currentState\']';

    class OSrefActive extends o.Behavior {

        init() {
            this.routes = o.di('routes');
            this.classname = this.elt.getAttribute(this.constructor.tag);
            this.sname = this.host.getModel(this.getModelVar('o-sref'));
            this.routes.elt.bindKey(CURRENT_STATE, this);
            this.render();
        }

        onDigest(key) {
            if (key !== CURRENT_STATE) {
                return;
            }
            this.render();
        }

        render() {
            if (this.sname === this.routes.elt.model.currentState.name) {
                this.elt.classList.add(this.classname);
            } else {
                this.elt.classList.remove(this.classname);                
            }
        }
    }
    OSrefActive.reg();
})();