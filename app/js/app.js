(function () {

  'use strict';

  angular.module('cool-code-module', ['cool-code']);

  angular.module('cool-code-module')

    .controller('appCtrl', function() {

      var vm = this;

      vm.test = function(a, b) {

        return a + b;

      };

      return vm;

    });

})();
