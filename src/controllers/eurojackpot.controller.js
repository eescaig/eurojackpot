(function() {
"use strict";

angular.module('controllers')
.controller('EurojackpotController', EurojackpotController);

EurojackpotController.$inject = ['EurojackpotService', 'DataMatchService', '$q'];
function EurojackpotController(EurojackpotService, DataMatchService, $q) {
  let ctrl = this;
  ctrl.currentDate = "";
  ctrl.error = "";
  ctrl.styleText = "";
  ctrl.winnersArray = [];
  ctrl.numbers = [];
  ctrl.euroNumbers = [];
  let descMatch = [];

  ctrl.obtainAllResults = () => {
      let promiseDataMatch = DataMatchService.getData();
      let promiseEurojackpot = EurojackpotService.getResultsWinningNumbers();

      return $q.all({
        promiseDataMatch,
        promiseEurojackpot
      }).then(response => {
          descMatch = response.promiseDataMatch.data.map(current => current.match);
          let current = response.promiseEurojackpot.data.last;
          ctrl.currentDate = formatDateArray(current.date);
          ctrl.numbers = current.numbers;
          ctrl.euroNumbers = current.euroNumbers;
          ctrl.winnersArray = obtainResultsWinningNumbers(current.odds);
      }).catch(errorResponse => {
          ctrl.error = "Failed service response";
          ctrl.styleText = "text-danger";
      });
  };

  ctrl.obtainAllResults();

  function obtainResultsWinningNumbers(winningNumbers) {
      let result = [];
      angular.forEach(winningNumbers, (value, key) => {
          let auxId = parseInt(key.substr(4, key.length));
          let item = {
                id: auxId,
                romNum: convertIntToRoman(auxId),
                match: descMatch[auxId - 1],
                winners: value.winners.toLocaleString('en-US'),
                prize: formatCurrency(value.prize)
          };

          if (auxId > 0) {
            result.push(item);
          }
      });
      return result.sort((itemA, itemB) => {
        return itemA.id - itemB.id;
      });
  }

  function formatCurrency(value) {
      let roundedWithCents = parseFloat((value / 100).toFixed(2));
      return roundedWithCents.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' });
  }

  function formatDateArray(dateArray) {
      let auxDate = new Date(Date.UTC(dateArray.year, dateArray.month - 1, dateArray.day, dateArray.hour, 0, 0));
      return auxDate.toLocaleDateString('en-GB', { weekday: 'long',
                                                   year: 'numeric',
                                                   month: 'short',
                                                   day: 'numeric' });
  }

  function convertIntToRoman(num) {
    let result = '';
    let decimals = [10, 9, 5, 4, 1];
    let roman = ["X","IX","V","IV","I"];
    for (var i = 0; i<=decimals.length; i++) {
        if(num >= decimals[i]) {
            return roman[i] + convertIntToRoman(num - decimals[i]);
        }
    }
    return result;
 }

}
})();
