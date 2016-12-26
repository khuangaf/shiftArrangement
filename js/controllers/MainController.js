app.controller("MainController", function($scope) {
	function Exco(name){
		this.name = name;
		this.avail = {};
		//initialize all timeslots for each exco to be true
		for (var key in $scope.timeslot){

			this.avail[key] = true;
		}
		console.log(this.avail)
	};

	$scope.getInterval = function(){
		$scope.datePicker = "ng-hide";
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
	  			day.setHours(9,0,0,0);
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
    $scope.excos = [];
    
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.excos.indexOf($scope.addMe) == -1) {
            $scope.excos.push(new Exco($scope.addMe));
        } else {
            $scope.errortext = "You have already entered this exco.";
        }

    } 
    
    $scope.removeItem = function (x) {
    	$scope.errortext = "";
        $scope.excos.splice(x, 1);
    } 

    // $scope.items = [1,2,3,4,5];
	$scope.selectedDates = [];

  	$scope.toggle = function (item, list) {
  		console.log(item.getDate());
  		console.log(item.getHours());
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
  		$scope.checkbox = "ng-hide";
	  	$scope.selectedDates.sort(function(a,b){
		  // Turn your strings into dates, and then subtract them
		  // to get a value that is either negative, positive, or zero.
		  return b < a;
		});
	  	// console.log($scope.selectedDates);
	  	$scope.timeslot = {}
	  	$scope.selectedDates.forEach(function (selectedDate){
	  		console.log(selectedDate)
	  		var counter = 0;
	  		while (selectedDate.getHours() < 18){
	  			date = new Date(selectedDate);

	  			$scope.timeslot[date] = 0;
	  			// console.log($scope.timeslot);
	  			if (counter % 2 == 0) {
	  				selectedDate.setHours(selectedDate.getHours() +1);
	  			}
	  			else {
	  				selectedDate.setHours(selectedDate.getHours() +2);
	  			}
	  			counter++;
	  		}
	  	
	  	});
	  	console.log($scope.timeslot);
	};

	//Mark an excos' timeslot to be unavailable
	$scope.disAvailToggle = function (excoIndex, time) {

		console.log(excoIndex,time, $scope.excos[excoIndex]);
    	if ($scope.excos[excoIndex].avail[time]) {
    		$scope.excos[excoIndex].avail[time] = false;
    	}
    	else{
    		$scope.excos[excoIndex].avail[time]  = true;
    	}
        console.log($scope.excos[excoIndex].avail);
    } 
});
