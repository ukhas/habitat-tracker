# Habitat JavaScript Balloon Tracker

## Developing on OS X

### Requirements

First install required tools:

    brew install lib/jsdoc-toolkit/jsdoc-toolkit.rb
    ln -s /usr/local/share/npm/lib/node_modules/jsdoc/jsdoc /usr/local/bin/jsdoc
    sudo easy_install http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz

If developing with Chrome, make sure to start it with:

    open -a "Google Chrome" --args --allow-file-access-from-files

Otherwise, (LESS)[http://lesscss.org/] stylesheets will fail.

### Compilation

We use Google Closure Compiler for JavaScript. To compile, run `./build.py --all`.
