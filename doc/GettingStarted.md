Getting Started
===============

Go to see the [examples](../examples/) directory to grab the code and read it.

If you want to quickly run them, you can execute them directly from the [official circle website](https://jlguenego.github.io/circle/).

Ok, let's go !

Hello {{name}}
--------------

- [Read the code](../examples/01-hello-name/)
- [Run it](https://jlguenego.github.io/circle/examples/01-hello-name/)


### Definition of a web component

To define a [web component](https://www.webcomponents.org/), you need to:
- have the *circle* library imported: `<link rel="import" href="pathto/node_modules/@jlguenego/circle/src/circle.html">`
- define its class, `class HelloName extends o.Element {}`
- register it. `HelloName.reg;`
- give it a template (optional), `<template id="hello-name"><h1>Hello {{name}} !</h1></template>`

Done !

By using *circle*, you will have less boilerplate code than in "vanilla" JS:
- Tag name is automatically calculated from the class name: the class `HelloName` (PascalCase) corresponds to the tag element `hello-name` (spinal-case).
- No long name like `window.customElements.define('app-drawer', AppDrawer);`. Just `AppDrawer.reg;`.
- Template is automatically using the Shadow DOM.
- Template understands expression (same syntax as AngularJS/Angular). At that time, expression are just variable replacement. No more, no less. `{{name}}` ok. `{{name | uppercase}}` not ok (may be in future version).

### Using a web component

Just put it in the code, anywhere in the `<body>`. Or inside another web component. Web component can embed other web components. So an web app is like a tree of web components (like Angular, React, etc.). The root of the tree is called the *root web component*.

For instance:

```
<body>
    <hello-name name="Maïté"></hello-name>
</body>
```

Here we have a **interpolation databinding**. The term comes from AngularJS/Angular.

Each web component defined with *circle* is called a **circle component**.

A circle component is equiped with a model, which is a fully observable object.

By specifying an attribute `my-key="my-value"` to a circle component, we add to the circle component model the property `myKey` which contains `my-value`.

If the attribute value changes, then the model value change and is propagated inside the circle component.

Let us check this fact !


Hello Madame Monsieur
---------------------

- [Read the code](../examples/02-hello-madame-monsieur/)
- [Run it](https://jlguenego.github.io/circle/examples/02-hello-madame-monsieur/)


Hmmm. Almost... It will work only if we added the attribute name to the observed attribute array (yes, it is because of the web component architecture limitation).
So we would absolutely need to do something like `HelloName.oa = ['name']`.

```
<template id="hello-name">
    <h1>Hello {{name}} !</h1>
</template>
<script>
    class HelloName extends o.Element {}
    HelloName.oa = ['name'];
    HelloName.reg;
</script>
```

Note that with the "Vanilla" JS, it would be:

```
static get observedAttributes() {return ['name']; }
```

And we have simplified to:
```
HelloName.oa = ['name'];
```





















