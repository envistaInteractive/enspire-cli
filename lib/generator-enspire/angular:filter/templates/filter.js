// module name: <%= moduleName %>.js
// file name: <%= filterName %>.js
(function() {
    /**
     * @ngdoc filter
     * @name <%= moduleName %>:<%= filterName %>
     * @function
     *
     * @description
     * <%= description %>
     *
     * @param {str} Something In.
     *
     * @returns {string} Something Out.
     *
     * @example
     {{ str | <%= filterName %> }}

     */
    angular.module('<%= moduleName %>').filter('<%= filterName %>', function() {
        return function(str) {
            return "";
        }
    });
})();