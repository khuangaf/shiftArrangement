app.controller("MainController", function($scope) {
	function Exco(name){
		this.name = name;
		
	};

	$scope.getInterval = function(){
	  	if (!$scope.startDate || !$scope.endDate){
	  		console.log("null");
	  		return null;
	  	}
	  	else {
	  		console.log("abc");
	  		var dates = [];
	  		for(var d= $scope.startDate; d <= $scope.endDate; d.setDate(d.getDate()+1))
	  		{
	  			var day = new Date(d)
	  			dates.push(day);
	  			
	  		}
	  		console.log(dates);
	  		$scope.dateInterval = dates;
	  	}
	};

  

  
  // $scope.onlyWeekendsPredicate = function(date) {
  //   var day = date.getDay();
  //   return day === 0 || day === 6;
  // };
    $scope.excos = ["Milk", "Bread", "Cheese"];
    $scope.timeslots = ["9:00-10:30", "10:30-12:00", "12:00-13:30", "13:30-15:00", "15:00-16:30", "16:30-18:00"]
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.excos.indexOf($scope.addMe) == -1) {
            $scope.excos.push($scope.addMe);
        } else {
            $scope.errortext = "You have already entered this exco.";
        }

    } 
    $scope.apple = new Exco("int");
    $scope.removeItem = function (x) {
    	$scope.errortext = "";
        $scope.excos.splice(x, 1);
    } 

    // $scope.items = [1,2,3,4,5];
	$scope.selectedDate = [];

  	$scope.toggle = function (item, list) {
  		console.log(item.getDate());
	    var idx = list.indexOf(item);
	    if (idx > -1) {
	      list.splice(idx, 1);
	    }
	    else {
	      list.push(item);
	    }
  	};

	$scope.exists = function (item, list) {
	    return list.indexOf(item) > -1;
  	};

  	$scope.confirmDate = function(){
	  	$scope.selectedDate.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return b < a;
		});
	  	console.log($scope.selectedDate);
	};
});
