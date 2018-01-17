(function() {
"use strict";

angular.module('controllers')
.controller('EurojackpotController', EurojackpotController);

EurojackpotController.$inject = ['EurojackpotService'];
function EurojackpotController(EurojackpotService) {
  let ctrl = this;
  ctrl.error = "";
  ctrl.styleText = "";

  ctrl.obtainAllResults = () => {
    EurojackpotService.getResultsWinningNumbers()
    .then((response) => {
      let current = response.data.last;
      console.log(current);
    })
    .catch((errorResponse) => {
      ctrl.error = errorResponse.message;
      ctrl.styleText = "text-danger";
    })
  }

  ctrl.obtainAllResults();

}
})();
