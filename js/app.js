var phonebookApp = angular.module('phonebookApp', ['ngRoute'])

phonebookApp.controller('PhonebookListCtrl', function($scope, $http) {
  
	$scope.name = '';
	$scope.number = '';
	$scope.email = '';
	$scope.age = '';
	$scope.city = '';
	$scope.imageUrl = '';
  
 $http.get("contactData.json").then(function (response) {
      $scope.phonebooks = response.data.records;
  });
	
	$scope.orderProp = 'name';
	$scope.edit = true;
	$scope.error = false;
	$scope.incomplete = false;
  
$scope.addContact = function() {
			
	$scope.phonebooks.push({
		name: $scope.name, 
		number: $scope.number, 
		email: $scope.email, 
		city: $scope.city,
		imageUrl: "http://i.imgur.com/Lbi0PDG.png",
	}); 
	
	$scope.name = '';
	$scope.number = '';
	$scope.email = '';
	$scope.city = '';
	
//	$scope.postData = function() {
//var url = "contactDatabase.php/contactData";
//var data = JSON.stringify({
//	name: $scope.name, 
//	number: $scope.number, 
//	email: $scope.email, 
//	city: $scope.city,
//	imageUrl: "http://i.imgur.com/Lbi0PDG.png"
//});
//		
//		
//$http.post(url, data)
//.then(function (response) {
//if (response.data)
//$scope.msg = "Data successfully inserted.";
//}, function (response) {
//$scope.msg = "Service not exists";
//$scope.statusval = response.status;
//$scope.statustext = response.statusText;
//$scope.headers = response.headers();
//});
//};
//		
	};
	
	$scope.removeContact = function (x) {
		var index = -1;
		var comArr = eval( $scope.phonebooks );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].number === x ) {
				index = i;
				break;
			}
		}
		$scope.phonebooks.splice(index, 1);
	};
	
	$scope.editUser = function(id) {
		if (id == 'new') {
			$scope.edit = true;
			$scope.incomplete = true;
			$scope.name = '';
			$scope.number = '';
			$scope.email = '';
			$scope.city = '';
      
		} else {
			$scope.edit = true;
			$scope.name = $scope.phonebooks[id - 1].name;
			$scope.number = $scope.phonebooks[id - 1].number;
			$scope.email = $scope.phonebooks[id - 1].email
			$scope.city = $scope.phonebooks[id - 1].city;
		}};

	$scope.$watch('city', function() {
		$scope.test();
	});
	$scope.$watch('name', function() {
		$scope.test();
	});
	$scope.$watch('number', function() {
		$scope.test();  
	});
	$scope.$watch('email', function() {
		$scope.test();
	});
  
	$scope.test = function() {
		$scope.incomplete = false;
		if ($scope.edit && (!$scope.name.length || !$scope.name.length || !$scope.email.length || !$scope.city.length)) {
			$scope.incomplete = true;
		}
	};
	
	$scope.contactsPerPage = 5;
	$scope.currentPage = 0;
	$scope.phonebooks = [];

	$scope.range = function() {
		var rangeSize = $scope.pageCount() + 1 ;
		var ret = [];
		var start = $scope.currentPage;
		if (start > $scope.pageCount() - rangeSize) {
			start = $scope.pageCount() - rangeSize + 1;
		}
	
		for (var i=start; i<start + rangeSize; i++) {
			ret.push(i);
		}
		return ret;
	}; //end of scope range function

	$scope.prevPage = function() {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	}; //end of function

	$scope.prevPageDisabled = function() {
		return $scope.currentPage === 0 ? "disabled" : "";
	}; //end of function
	
	$scope.nextPage = function() {
		if ($scope.currentPage < $scope.pageCount()) {
			$scope.currentPage++;
		}
	}; //end of function

	$scope.nextPageDisabled = function() {
		return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
	}; //end of function

	$scope.pageCount = function() {
		return Math.ceil($scope.phonebooks.length / $scope.contactsPerPage) - 1;
	}; //end of function
	
	$scope.setPage = function(n) {
		$scope.currentPage = n;
	}; //end of function
	
}); //end of Phone Book controller

	phonebookApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.
	when('/phonebooks/:idVar', {
		templateUrl: 'phoneBookTemplate.html',
		controller: "sampleCtrl"
	});
}]); 
 
	phonebookApp.controller("sampleCtrl", function ($scope, $routeParams) {
		$scope.contactInfo = $routeParams.idVar;
	});


phonebookApp.filter("offset", function() {
	return function(input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});