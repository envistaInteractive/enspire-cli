// module name: <%= moduleName %>.js
// file name: <%= directiveName %>.js
'use strict';
(function () {

    /**
     * @ngdoc directive
     * @name <%= moduleName %>:<%= directiveName %>
     * @restrict <%= restrict %>
     * @scope
     * @description
     * <%= description %>
     *
     * @example
     *
     */

    angular.module('<%= moduleName %>').directive('<%= directiveName %>', [ function () {

        //Outputs the template to use based on resolveType
        function resolveTemplate ($element, $attrs) {

            return '';

        }
        function compile ($element, $attrs, $transclude) {

            return function postLink ($scope, $element, $attrs) {

                $transclude($scope, function (clone) {

                    $element.append(clone);

                });

            };

        }
        return {
            restrict: '<%= restrict %>',
            replace: true,
            transclude: true,
            template: resolveTemplate,
            compile: compile
        };

    } ]);

})();
