if (window.circle) { console.warning('circle already loaded'); }

window.o = function (element, tag) {
    if (tag === undefined) {
        return element.getRootNode().host;
    }
    let host = element.getRootNode().host;
    while (host.constructor.tag !== tag) {
        host = host.getRootNode().host;
        if (!host) {
            throw new Error('circle.wc: cannot find a component with tag ' + tag);
        }
    }
    return host;
};
Object.setPrototypeOf(window.o, new Circle());
window.circle = window.o;
