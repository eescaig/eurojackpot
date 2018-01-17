'use strict';

(function () {
  "use strict";

  angular.module('services').service('EurojackpotService', EurojackpotService).constant('ApiBasePath', "https://www.lottoland.com/api/drawings/euroJackpot");

  EurojackpotService.$inject = ['$http', '$sce', 'ApiBasePath'];
  function EurojackpotService($http, $sce, ApiBasePath) {
    var service = this;

    service.getResultsWinningNumbers = function () {
      return $http.jsonp($sce.trustAsResourceUrl(ApiBasePath));
    };
  }
})();