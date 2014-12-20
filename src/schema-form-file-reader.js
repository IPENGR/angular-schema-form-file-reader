angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var filereader = function(name, schema, options) {
      if (schema.type === 'string' && schema.format == 'file-reader') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'file-reader';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(filereader);


    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'file-reader',
    'directives/decorators/bootstrap/file-reader/file-reader.html');
    schemaFormDecoratorsProvider.createDirective('file-reader',
    'directives/decorators/bootstrap/file-reader/file-reader.html');
  }]);
