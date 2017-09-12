Getting Started
===============

You can see the examples ([sources](../examples/), [run](https://jlguenego.github.io/circle/examples/index.html)).

Ok, let's go !

01 - Hello {{name}}
-------------------

- [Read the code](../examples/01-hello-name/)
- [Run it](https://jlguenego.github.io/circle/examples/01-hello-name/index.html)


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
- Template understands **expression** (similar syntax as AngularJS/Angular). At that time, expressions are just observable variable replacement. No more, no less. `{{name}}` ok. `{{name | uppercase}}` not ok (may be in future version).

### Using a web component

Just put it in the code, anywhere in the `<body>`. Or inside another web component. Web component can embed other web components. So a web app is like a tree of web components (like Angular, React, etc.). The root of the tree is called the *root web component*.

For instance:

```
<body>
    <hello-name name="Maïté"></hello-name>
</body>
```

Here we have a **interpolation databinding**. The term comes from AngularJS/Angular.

Each web component defined with *circle* is called a **circle component**.

A circle component is equiped with a **model**, which is a fully observable object.

By specifying an attribute `my-key="my-value"` to a circle component, we add to the circle component model the property `myKey` which contains `my-value`.

If the attribute value changes, then the model value change and is propagated inside the circle component.

Let us check this fact !


02 - Hello Madame Monsieur
--------------------------

- [Read the code](../examples/02-hello-madame-monsieur/)
- [Run it](https://jlguenego.github.io/circle/examples/02-hello-madame-monsieur/index.html)


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

03 - Model
----------

- [Read the code](../examples/03-model/)
- [Run it](https://jlguenego.github.io/circle/examples/03-model/index.html)

All variables given in a expression `{{...}}` comes from the circle component **model**.
The model is in fact a javascript `Proxy` on an initially 
empty object `{}`. The developer can add any property to the model. If a property is an object, it will be proxied as well.

When a property is added or modified in the model, the proxy triggers what we call a **digestion** (like in AngularJS).

A digestion on a model property is in charge to propagate everywhere is needed the value of the model.

In the example, you can see how we *manually* add a property to the model of a circle component.

```
<body>
	<template id="person-detail">
		<style>
			li {
				border: 1px solid gray;
			}
		</style>
		<h1>Person Detail</h1>
		<ul>
			<li>First name: {{firstname}}</li>
			<li>Last name: {{lastname}}</li>
			<li>Email: {{profile.email}}</li>
			<li>Birthday: {{['personal-info'].birthday}}</li>
		</ul>
	</template>
	<script>
		class PersonDetail extends o.Element {
			constructor() {
				super();
				this.model.firstname = 'John';
				this.model.lastname = 'Doe';
				this.model.profile = {
					email: 'john@doe.io'
				};
				this.model['personal-info'] = {
					birthday: '12 dec. 2004'
				};
			}
		}
		PersonDetail.reg;
	</script>
</body>
```

Note: CSS styles are local. In this example, the `li` settings from above the component are ignored.

04 - Property databinding
-------------------------

- [Read the code](../examples/04-one-way-db/)
- [Run it](https://jlguenego.github.io/circle/examples/04-one-way-db/index.html)

**Property databinding** (also called **one-way databinding**) consists to pass a model variable from a parent circle component to a child circle component.

There is a specific notation: the property variable must be passed within square brackets `[]`.

Here we pass the model variable `firstname`: so `<hello-name name="[firstname]"></hello-name>`.


```
<body>
	<template id="my-app">
		<hello-name name="[firstname]"></hello-name><br>
		<button onclick="o(this).model.firstname = 'Jean-Louis'">Hello Monsieur</button>
		<button onclick="o(this).model.firstname = 'Maïté'">Hello Madame</button>
	</template>
	<script>
		class MyApp extends o.Element {
			constructor() {
				super();
				this.model.firstname = 'Maïté';
			}
		}
		MyApp.reg;
	</script>
</body>
```

As well you can see the `o(this)`. It is a quick way to retrieve the parent circle component from anywhere, particularely from a on[event] attribute.
















