var path = require('path');
var Filter = require('broccoli-filter');

module.exports = TemplatePrecompiler;
TemplatePrecompiler.prototype = Object.create(Filter.prototype);
TemplatePrecompiler.prototype.constructor = TemplatePrecompiler;
function TemplatePrecompiler (inputTree, options) {
  if (!(this instanceof TemplatePrecompiler)) {
    return new TemplatePrecompiler(inputTree, options);
  }

  Filter.call(this, inputTree, options) // this._super()

  this.inputTree = inputTree;
  this.options = options || {
    namespace: "JST",
    module: true
  };
}

TemplatePrecompiler.prototype.extensions = [];
TemplatePrecompiler.prototype.targetExtension = 'js';

TemplatePrecompiler.prototype.processString = function (string, relativePath) {
  var extensionRegex = /.ejs/gi;
  var filename = relativePath.toString().split('templates' + path.sep).reverse()[0].replace(extensionRegex, '');
  var template = this.options.compile(string);
  if (this.options.module === true) {
    return "export default " + template;
  } else if (this.options.commonjs === true) {
    return "module.exports = " + template;
  } else {
    return this.options.namespace + "['" + filename + "'] = " + template;
  }
};
