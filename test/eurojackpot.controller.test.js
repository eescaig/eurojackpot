describe('EurojackpotController', function () {

  beforeEach(() => {
      // Injectamos $provider service
      angular.mock.module(($provide) => {
            $provide.service('EurojackpotServiceMock', function($q) {
              let service = this;
              let allResults = {"data" : {"last": {
                                          "date": {
                                              "full": "Die Lottozahlen vom Freitag, den 12.01.2018",
                                              "day": 12,
                                              "month": 1,
                                              "year": 2018,
                                              "hour": 21,
                                              "minute": 0,
                                              "dayOfWeek": "Freitag"
                                          },
                                          "numbers": [16, 17, 25, 40, 44],
                                          "euroNumbers": [2, 9],
                                          "odds": {
                                                "rank0": {
                                                      "winners": 0,
                                                      "specialPrize": 0,
                                                      "prize": 0
                                                },
                                                "rank1": {
                                                      "winners": 0,
                                                      "specialPrize": 0,
                                                      "prize": 5400000000
                                                },
                                                "rank2": {
                                                      "winners": 1,
                                                      "specialPrize": 0,
                                                      "prize": 208296720
                                                }
                                          }
                                      } //last
                                    }
                               };

              service.getResultsWinningNumbers =  function() {
                return $q.resolve(allResults);
              }
            });

            $provide.service('DataMatchServiceMock', function ($q) {
                let serviceD = this;
                let dataMatch = {"data" : [{"match":"5 Numbers + 2 Euronumbers"},{"match":"5 Numbers + 1 Euronumber"},{"match":"5 Numbers + 0 Euronumbers"}] };

                serviceD.getData = function () {
                    return $q.resolve(dataMatch);
                }
            });

      });

      angular.mock.module('controllers');
  });

  let $controller;
  let eurojackpotController;
  let scope;

  beforeEach(inject(function (_$controller_,  EurojackpotServiceMock, DataMatchServiceMock, $rootScope) {
      $controller = _$controller_;
      eurojackpotController =
      $controller('EurojackpotController',
                  {EurojackpotService: EurojackpotServiceMock, DataMatchService: DataMatchServiceMock});
      scope = $rootScope;

  }));

  it('should return all winners numbers', (done) => {

      eurojackpotController.obtainAllResults().then( () => {
          let winners = [Object({id: 1, romNum: "I", match: "5 Numbers + 2 Euronumbers", winners: "0", prize: "€54,000,000.00"}),
                         Object({id: 2, romNum: "II", match: "5 Numbers + 1 Euronumber", winners: "1", prize: "€2,082,967.20"})];

          expect(eurojackpotController.currentDate).toEqual("Friday, 12 Jan 2018");
          expect(eurojackpotController.numbers).toEqual([16, 17, 25, 40, 44]);
          expect(eurojackpotController.euroNumbers).toEqual([2, 9]);
          expect(eurojackpotController.winnersArray).toEqual(winners);

          done();
      })

      scope.$digest();
  });

});
