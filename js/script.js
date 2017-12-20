var app = angular.module('app', [])

app.controller('aCtrl', function($scope,$interval) {
	$scope.targetList = []
	$scope.fillList = function() {
		$scope.targetList.push({title:'Babar',color:'success',image:'car.png',date: moment().startOf('day').add(16,'hours').add(27,'minutes')})
	}
	$scope.countdown = function(target) {
		var today = moment().startOf('day')
		var now = moment()
		var diff = moment.utc(moment.duration(target.date.diff(now)).asMilliseconds()).format("HH:mm:ss")
		return diff
	}
	$scope.fillList()
})
