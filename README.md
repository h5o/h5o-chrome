# HTML5 outliner for Chrome #

The extension is [available on Chrome Store](https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo)

See [h5o/h5o-js](https://github.com/h5o/h5o-js) for the outlining code library, visit https://h5o.github.io/ for details and bookmarklet.

Published on npm, because it's JS. You can also "Load unpacked extension" from `dist/extension` in Chrome.

## Development ##

### Pre-requisites ###

1. install `node` or `iojs` (includes npm)
2. `npm install -g grunt-cli`
3. `npm install` in your local clone of this repo

### Build ###

Run `grunt` to produce `dist/extension/`

## History ##

### v?.?.? (????-??-??) ###
* ???

### v0.8.15(2016-08-11)

- added suggested_key "Alt+Shift+P"

### v0.8.12 ###

* https://github.com/h5o/h5o-chrome/issues/10

### v0.8.1 - v0.8.11 (2015-03) ###
* Deployment automation

### v0.8.0 (2015-03-17) ###
* Standalone crx release
* Standalone release also asks for `file://*` permission

### v0.7.0 (2015-03-04) ###
* Dependency updates
* Styling tweaks
* Links to bug tracker, source code

### v0.6.1 (2015-02-23) ###
* Minor manifest tweaks

### v0.6.0 (2015-02-23) ###
* Rewritten build scripts with [`grunt`](http://gruntjs.com)
* Published on npm

### v0.5.1 and earlier ###
Originally [lived on Google Code](https://code.google.com/p/h5o), if you like archeology

## crxmake.sh ##

Made available by Google at [https://developer.chrome.com/extensions/crx](https://developer.chrome.com/extensions/crx) under CC-By 3.0 license
