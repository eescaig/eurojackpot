'use strict';

(function () {
  "use strict";

  angular.module('controllers').controller('EurojackpotController', EurojackpotController);

  EurojackpotController.$inject = ['EurojackpotService'];
  function EurojackpotController(EurojackpotService) {
    var ctrl = this;
    ctrl.error = "";
    ctrl.styleText = "";

    ctrl.obtainAllResults = function () {
      EurojackpotService.getResultsWinningNumbers().then(function (response) {
        var current = response.data.last;
        console.log(current);
      }).catch(function (errorResponse) {
        ctrl.error = errorResponse.message;
        ctrl.styleText = "text-danger";
      });
    };

    ctrl.obtainAllResults();
  }
})();