# svelte-babylon

A [BabylonJS](https://www.babylonjs.com/) component library for Svelte.

## Description

This library is a work in progress. It has not been tested in its entirety and there are surely bugs, that haven't been fixed or even been identified.

If you find anything not working as expected, it would be great for you to open an issue.

## Documentation

[Website](https://svelte-babylon.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/67a15e95-bc5d-46e2-9fc9-061a39578019/deploy-status)](https://app.netlify.com/sites/svelte-babylon/deploys)

To see the component library locally follow these steps:

```bash
git clone git@github.com:Myrmod/svelte-babylon.git && cd svelte-babylon
npm ci
npm run vitebook:dev
```

If you get errors that you cannot load glb files, try deleting `.vitebook/.cache` and `.vitebook/.temp` and restarting your development process. This seems to be a cache problem of `vitebook`.

## Installation

```
npm i svelte-babylon
```

## Developing

```
npm ci
```

Run `npm run vitebook:dev` to launch the demo site.

## License

[MIT (modified)](LICENSE)
