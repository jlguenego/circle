Getting Started
===============

Go to see the [examples](../examples/) directory to grab the code and read it.

If you want to quickly run them, you can execute them directly from the [official circle website](https://jlguenego.github.io/circle/).

Ok, let's go !

Hello {{name}}
--------------

- [Read the code](../examples/01-hello-name/)
- [Run it](https://jlguenego.github.io/circle/examples/01-hello-name/)

To use a [web component](https://www.webcomponents.org/), you need to:
- have the *circle* library imported: `<link rel="import" href="pathto/node_modules/@jlguenego/circle/src/circle.html">`
- define its class, `class HelloName extends o.Element {}`
- register it. `HelloName.reg();`
- give it a template (optional), `<template id="hello-name"><h1>Hello {{name}} !</h1></template>`

Done !

By using *circle*, you will have less boilerplate code than in "vanilla" JS:
- Tag name is automatically calculated from the class name: the class `HelloName` (PascalCase) corresponds to the tag element `hello-name` (spinal-case).
- No long name like `customElements.define`.








