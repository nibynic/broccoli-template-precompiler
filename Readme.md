# broccoli-template-precompiler

A template language agnostic filter for Broccoli that precompiles templates.

## Installation

```bash
npm install --save-dev broccoli-template-precompiler
```

## Usage Example

```js
module.exports = function (broccoli) {
  var templateCompiler = require('broccoli-template-precompiler')
  var compile = require("your-template-compilator")
  var pickFiles = require('broccoli-static-compiler')

  function preprocess (tree) {
    tree = templateCompiler(tree);
    return tree
  }

  var sourceTree = broccoli.makeTree('js');
  var templates = pickFiles(sourceTree, {
    extensions: ['ejs'],
    srcDir: '/templates',
    destDir: '/templates',
    compile: compile
  })
  var appTemplates = preprocess(templates);
  return [appTemplates];
}
```

## Compile function

A compile function is any function that receives one argument (the template's string)
and returns a JavaScript function of the compiled template.

For example, when you want to use underscore's templating system that's what you should do:

```` js
var _ require "underscore";

var compile = function(string) {
  return _.template(string, { variable: "obj" }).source;
}
````

Note: The `variable` option is required for the template to be compatible with `use strict`.

## Output

The filter can output templates in any of the three ways:

### Module

When you provide `module: true` option, the templates will use the following syntax:

```` js
export default function() { /* ... */ };
````

### CommonJS

When you provide `commonjs: true` option, the templates will use the following syntax:

```` js
module.exports = function() { /* ... */ };
````

### Global namespace

Without any of the above options the following syntax will be used:

```` js
JST["path/to/template"] = function() { /* ... */ };
````

You can specify the namespace through the `namespace` option. The default namespace is `JST`.
