(function() {
"use strict";

angular.module('services')
.service('DataMatchService', DataMatchService)
.constant('Path', "http://localhost:3000/src/services/match.json");

DataMatchService.$inject = ['$http', 'Path'];
function DataMatchService($http, Path) {
  let service = this;

  service.getData = function () {
    return $http.get(Path);
  }
}
})();
