# pkd-vue-touch-ui
Vue3 touch interface designed for integration with Audio/Video control systems.

While this framework is primarliy designed to work with Crestron control systems, it can be modified to communicate with any system that supports HTML/CSS and Node.js.

## Features
### Pinia State Management

 CrComLib subscription events update Pinia stores

### CH5 Web Xpanel

starter setup & initialization of the CH5 XPanel (plugins > xpanel > crestronXpanel.js)

### Eruda Developer Tools

Includes Eruda touchscreen dev tools (active by default)

### HEX Alpha to RGBA Build Script

Crestron TSW panels have issues with transparency in some minified CSS cases, such as when PostCSS converts RGBA to Hex.
AlphaFixer.js parses all CSS files in ~/dist/assets for hex with alpha and reverts it to rgba()
fixColor build script has been inluded if this is necessary for your project but has not been inluded with the archive command

### Credits

Thanks to dvjstefan for prividing an example of how to integrate CrComLib with Vue 3/Vite: https://github.com/dvjstefan/CH5-VueJS-Vite-Pinia-Example/tree/main. This template is based on their implementation of CrComLib and adds boiler plate for XPanel connections.
Alvaro Yurrita - DGI Tech & Tomer Raz - TRZ Industries for giving examples of how to fix the CSS Hex/RGBA issue with TSW touchscreens
Thanks to everyone in the Crestron Certified Programmers Discord for being a group of legends.

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
