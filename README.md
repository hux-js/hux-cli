<p align="center">
  <a href="https://huxjs.org" target="_blank" rel="noopener noreferrer">
    <img src="https://avatars1.githubusercontent.com/u/74376133?s=200&v=4" alt="Hux JS" width="120"/>
  </a>
</p>

<h1 align="center"><a href="https://huxjs.org" target="_blank" rel="noopener noreferrer">CLI</a></h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@hux-js/cli"><img src="https://img.shields.io/badge/npm-v0.1.0-blue" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@hux-js/cli"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

---

CLI is the command line interface for Hux](https://github.com/hux-js/hux). It includes features such as API contract testing. This can be used in automated testing pipelines, or locally, to ensure your clients are compatible with the data returned from the server.

---

## Installation

### NPM

```
npm i @hux-js/cli
```

### Yarn

```
yarn add @hux-js/cli
```

---

## Basic usage

### Contract testing

Add the following script to the `scripts` object in `package.json`, where `-d src/` is your app directory:

<code>"test:contract": "hux test -d src/"</code>

You can then call it with `npm run test:contract`.

<blockquote>You may experience a CORS issue if you have custom whitelisting on your server. Disabling this for the development server, or if `Origin` is undefined can fix this</blockquote>

---

## Contributing

If you'd like to contribute please read our [Code of Conduct](https://github.com/hux-js/hux-cli/blob/develop/CODE_OF_CONDUCT.md) & [Contributing](https://github.com/hux-js/hux-cli/blob/develop/CONTRIBUTING.md) guides before doing so

---

Full Documentation - https://huxjs.org