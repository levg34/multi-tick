var app = angular.module('app', [])
//const MARGIN = 300000
const MARGIN = 180000 // 3 minutes

function compareTarget(a,b) {
	if (a.date.isBefore(b.date)) {
		return -1
	}
	if (a.date.isAfter(b.date)) {
		return 1
	}
	return 0
}

app.controller('aCtrl', function($scope,$interval) {
	$scope.targetList = []
	$scope.createTarget = function (title,hours,minutes,locomotion) {
		var res = {
				title:title,
				color:'success',
				date: moment().startOf('day').add(hours,'hours').add(minutes,'minutes')
			}
		
		if (locomotion == 'tramway') {
			res.image = 'tram-wait.jpg'
		} else if (locomotion == 'tram') {
			res.image = 'tram-climb.jpg'
		} else {
			res.image = 'car.png'
		}
		
		$scope.targetList.push(res)
		$scope.targetList.sort(compareTarget)
	}
	$scope.fillList = function() {
		$scope.createTarget('Babar matin',11,27,'car')
		$scope.createTarget('Babar après-midi',16,27,'tramway')
		$scope.createTarget('Test',15,15,'tram')
	}
	$scope.countdown = function(target) {
		var today = moment().startOf('day')
		var now = moment()
		var diffms = moment.duration(target.date.diff(now)).asMilliseconds()
		if (diffms<=0) {
			diffms = 0
			target.color = 'danger'
		} else if (diffms<=MARGIN) {
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
