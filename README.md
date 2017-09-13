Circle
======

Official web site: (https://jlguenego.github.io/circle/)

Purpose: 
- Using the web components technologies in projects, and the other very recent web API.
- Reducing boilerplate code to something very simple for the developer.
- Providing templating, observable model, with the 4 kinds of databinding (1-way, 2-way, interpolation, event), Dependancy Injection.
- Library size very small.

Installation
------------
```
npm install @jlguenego/circle
```

Then, in your HTML file, import the circle HTML file.
```
<link rel="import" href="../node_modules/@jlguenego/circle/src/circle.html">
```

Done.

**Note: Polyfill**

If you want your code working on almost all browsers, we highly recommand to use a web component API polyfill in your `index.html` header before including *circle*:

`<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.10/webcomponents-lite.js"></script>`


Table of Content
================

- [Getting started](./doc/GettingStarted.md)
- [Concepts](./doc/Concepts.md)
- [API Reference](./doc/APIReference.md)
- [Examples](./doc/Examples.md)


Why Circle ?
============

A circle has no angle, is not [angular](https://angular.io/)... ;)

It would be more an alternative of [Polymer](https://www.polymer-project.org/)



Author
======
Just for fun.
Jean-Louis GUENEGO, @2017.



