angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/file-reader/file-reader.html","<script type=\'text/javascript\'>\n    angular.module(\'lightApp\').controller(\'fileReaderCtrl\', function ($scope) {\n        $scope.showContent = function($fileContent){\n            $scope.content = $fileContent;\n        };\n    });\n\n    angular.module(\'lightApp\').directive(\'onReadFile\', function ($parse) {\n        return {\n            restrict: \'A\',\n            scope: false,\n            link: function(scope, element, attrs) {\n                var fn = $parse(attrs.onReadFile);\n\n                element.on(\'change\', function(onChangeEvent) {\n                    var reader = new FileReader();\n\n                    reader.onload = function(onLoadEvent) {\n                        scope.$apply(function() {\n                            fn(scope, {$fileContent:onLoadEvent.target.result});\n                        });\n                    };\n\n                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);\n                });\n            }\n        };\n    });\n</script>\n<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div class=\"form-group\" ng-controller=\"fileReaderCtrl\">\n    <input type=\"file\" on-read-file=\"showContent($$value$$ = $fileContent)\" sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" />\n    <div ng-if=\"content\">\n      <pre>{{ content }}</pre>\n    </div>\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n  </div>\n</div>\n");}]);
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
