angular.module('weatherModule', ['restangular','ngSanitize'])
    .directive('angularWeather', ['Restangular' , function (Restangular) {
    return {
        restrict: 'AE',
        templateUrl: 'angularWeatherDirective/angular-weather.tpl.html',
        scope: {
            cityName: '@'
        },
        controller: function ($scope) {
            $scope.Data = {
                name : ''
            };
            $scope.Func = {
                initGetData: function (cityName) {
                    return Restangular.oneUrl('api', 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ cityName +'")&format=json').get();
                }

            };

            $scope.Api = {

            };

            var Run = function () {
                $scope.Func.initGetData($scope.cityName);
            };
            Run();
        },
        link: function (scope, element, attrs, ctrls) {
        }
    };
}]);
