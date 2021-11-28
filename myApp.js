var app = angular.module('myApp', []);
app.service('myLocal', function () {
    this.add = function (a, b) { return a + b; }
    this.sub = function (a, b) { return a - b; }
    this.mul = function (a, b) { return a * b; }
    this.div = function (a, b) { return a / b; }
    this.mod = function (a, b) { return a % b; }
});

app.controller('calculatorController', function ($scope, myLocal) {
    $scope.currentTotal = 0;
    $scope.operationIcon = null;
    $scope.ledDisplay = 0;
    $scope.enterInput = function (value) {
        if ($scope.ledDisplay == 0) {
            $scope.ledDisplay = value;
        } else {
            $scope.ledDisplay += String(value);
        }
    };
    $scope.operate = function (a) {
        if ($scope.ledDisplay == 0) {
            console.log("enter");
        }
        else {
            $scope.operationIcon = String($scope.ledDisplay) + a;
            $scope.currentTotal = $scope.ledDisplay;
            $scope.ledDisplay = 0;
            $scope.new = a;
        }
    }

    $scope.getResult = function () {
        if ($scope.ledDisplay == 0 || $scope.operationIcon == null) {
            console.log("ERROR")
        }
        else {
            if ($scope.new == "%") {
                $scope.ledDisplay = myLocal.mod(parseFloat($scope.currentTotal), parseFloat($scope.ledDisplay));

                $scope.operationIcon = null;
            }
            if ($scope.new == "/") {
                $scope.ledDisplay = myLocal.div(parseFloat($scope.currentTotal), parseFloat($scope.ledDisplay));

                $scope.operationIcon = null;
            }
            if ($scope.new == "*") {
                $scope.ledDisplay = myLocal.mul(parseFloat($scope.currentTotal), parseFloat($scope.ledDisplay));
                $scope.operationIcon = null;
            }
            if ($scope.new == "-") {
                $scope.ledDisplay = myLocal.sub(parseFloat($scope.currentTotal), parseFloat($scope.ledDisplay));

                $scope.operationIcon = null;
            }
            if ($scope.new == "+") {
                $scope.ledDisplay = myLocal.add(parseFloat($scope.currentTotal), parseFloat($scope.ledDisplay));

                $scope.operationIcon = null;
            }
        }
    }

    $scope.clearOne = function () {
        $scope.ledDisplay = $scope.ledDisplay.slice(0, -1);
        if ($scope.ledDisplay.length == 0) {
            $scope.ledDisplay = 0;
        }
    }
    $scope.allClear = function () {
        $scope.currentTotal = null;
        $scope.ledDisplay = 0;
        $scope.operationIcon = null;
    }
});