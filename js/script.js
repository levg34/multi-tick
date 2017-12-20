var app = angular.module('app', [])
//const MARGIN = 300000
const MARGIN = 180000 // 3 minutes

app.controller('aCtrl', function($scope,$interval) {
	$scope.targetList = []
	$scope.fillList = function() {
		$scope.targetList.push({title:'Babar matin',color:'success',image:'car.png',date: moment().startOf('day').add(11,'hours').add(27,'minutes')})
		$scope.targetList.push({title:'Babar après-midi',color:'success',image:'tram-wait.jpg',date: moment().startOf('day').add(16,'hours').add(27,'minutes')})
	}
	$scope.countdown = function(target) {
		var today = moment().startOf('day')
		var now = moment()
		var diffms = moment.duration(target.date.diff(now)).asMilliseconds()
		if (diffms<0) {
			diffms = 0
			target.color = 'danger'
		} else if (diffms<MARGIN) {
			target.color = 'warning'
		}
		var diff = moment.utc(diffms).format("HH:mm:ss")
		target.left = diff
	}
	$scope.refresh = function() {
		$scope.targetList.forEach(function(target) {
			$scope.countdown(target)
		})
	}
	$scope.remove = function(target) {
		var index = $scope.targetList.map(function(e) {
			return e.title
		}).indexOf(target.title)
		if (index != -1) {
			$scope.targetList
		}
		$scope.targetList = $scope.targetList.filter(function(e) {
			return e.title != target.title
		})
	}
	$scope.fillList()
	$scope.refresh()
	$interval($scope.refresh, 500)
})
