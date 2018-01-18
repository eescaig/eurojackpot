describe('EurojackpotService', function () {

  var euroJPService;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(angular.mock.module('services'));

  beforeEach(inject(function ($injector) {
      euroJPService = $injector.get('EurojackpotService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
  }));

  it('should return eurojackpot winners numbers', () => {
      $httpBackend.whenJSONP(ApiBasePath + "?callback=JSON_CALLBACK").respond([16, 17, 25]);

      euroJPService.getResultsWinningNumbers().then(function(response) {
        expect(response.data).toEqual([16, 17, 25]);
      });

      $httpBackend.flush();
  });

});
