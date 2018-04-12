// module name: <%= moduleName %>.js
// file name: <%= controllerName %>.js
'use strict';
(function () {

    /**
     * @ngdoc controller
     * @name <%= moduleName %>:<%= controllerName %>
     * @description
     * <%= description %>
     */
    angular.module('<%= moduleName %>').controller('<%= controllerName%>', [ function () {

        // eslint-disable-next-line
        var self = this;

        self.property = 'value';

    } ]);

})();
