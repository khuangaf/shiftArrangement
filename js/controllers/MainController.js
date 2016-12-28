app.controller("MainController", function($scope) {
	$scope.datePicker = false;
	$scope.alwaysTrue = true;
	
	function Exco(name){
		this.name = name;
		this.avail = {};
		this.shiftAssigned = 0;
		this.shiftAvailable = 0;
		//initialize all timeslots for each exco to be true

		
		for (var key in $scope.timeslot){

			this.avail[key] = true;
			this.shiftAvailable += 1;
    		$scope.timeslot[key] += 1;

		}
		console.log(this.shiftAvailable);
	};

	$scope.getInterval = function(){
		$scope.datepick = true;
		$scope.checkbox = true;

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

  		$scope.checkbox = false;
  		$scope.addExco = true;
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
    		$scope.excos[excoIndex].shiftAvailable -= 1;
    		$scope.timeslot[time] -= 1;
    	}
    	else{
    		$scope.excos[excoIndex].avail[time]  = true;
    		$scope.excos[excoIndex].shiftAvailable += 1;
    		$scope.timeslot[time] += 1;
    	}
        console.log($scope.excos[excoIndex].avail);
        console.log($scope.timeslot);
    };

 //    var dates = [];
 //    	for (var i =0; i<4; i++){
	//     	var day = new Date();
	//     	day.setDate(day.getDate()+i);
	//     	day.setHours(9,0,0,0);
	//     	dates.push(day);
	//     }

	//     console.log(dates);
 //    $scope.testDates = dates;
    



   
 //    var timeslot = {};
	// $scope.testDates.forEach(function (selectedDate){
 //  		// console.log(selectedDate)
 //  		var counter = 0;
 //  		while (selectedDate.getHours() < 18){
 //  			date = new Date(selectedDate);

 //  			timeslot[date] = 0;
 //  			// console.log($scope.timeslot);
 //  			if (counter % 2 == 0) {
 //  				selectedDate.setHours(selectedDate.getHours() +1);
 //  			}
 //  			else {
 //  				selectedDate.setHours(selectedDate.getHours() +2);
 //  			}
 //  			counter++;
 //  		}
  	
 //  	});
 //    $scope.timeslot = timeslot;
 //    // console.log($scope.timeslot);

 //    $scope.excos = [];
 //    Math.seedrandom(1);
 //  	for(var i=0; i< 10; i++){
	// 	$scope.excos.push(new Exco(i));
	// 	for (var key in $scope.timeslot){
	// 		var ran = Math.random();
	// 		if (ran > 0.6){
	// 			$scope.excos[i].avail[key]	= true;
	// 			$scope.excos[i].shiftAvailable += 1;
	// 			$scope.timeslot[key] += 1;
	// 		}
	// 		else{
	// 			$scope.excos[i].avail[key]	= false;
	// 		}
	// 	}
	// 	// console.log($scope.excos[i].avail);
 //  	}




  	//return smallest value
  	var min = function(list){
  		if (list.length < 1) return null;
  		if (list.length == 1) return list[0];
  		var currentMin = list[0];
  		for(i = 1; i < list.length; i++){
  			if (currentMin > list[i]) {
  				currentMin = list[i]
  			}
  		}
  		return currentMin;
  	};

  	//return largest value
  	var max = function(list){
  		if (list.length < 1) return null;
  		if (list.length == 1) return list[0];
  		var currentMax = list[0];
  		for(i = 1; i < list.length; i++){
  			if (currentMax < list[i]) {
  				currentMax = list[i]
  			}
  		}
  		return currentMax;
  	};

	//return the key with the largest value  	
  	var argMax = function(dict){
  		var currentMax = -1000;
  		var bestArg = null;
  		for (var key in dict){
  			if (dict[key] > currentMax){
  				bestArg = key;
  				currentMax = dict[key];
  			}
  		}
  		return bestArg;
  	};

  	//return the key with the smallest value
  	var argMin = function(dict){
  		var currentMin = 100000;
  		var bestArg = null;
  		for (var key in dict){
  			if (dict[key] < currentMin){
  				bestArg = key;
  				currentMin = dict[key];
  			}
  		}
  		return bestArg;
  	};
  	
  	

  	//return the next timeslot to be assigned
  	//return null if assigment is complete
  	var getNextTimeslot = function(){
  		var minAvailableExco = $scope.excos.length;
  		var nextTimeslot = null;
  		for (var key in $scope.timeslot){
  			// console.log(key, $scope.assignment[key]);
  			if($scope.timeslot[key] > 0){
	  			if($scope.assignment[key].size== 0){
	  				
	  				if( $scope.timeslot[key] < minAvailableExco){
	  					nextTimeslot = key;
	  					minAvailableExco = $scope.timeslot[key];
	  				}
	  				else if($scope.timeslot[key] == minAvailableExco){
	  					if (nextTimeslot == null){
	  						nextTimeslot = key;
	  					}
	  				}
	  			}
	  		}
  		}
  		// console.log("next",nextTimeslot);
  		return nextTimeslot;
  	};

  	//return the index of the next exco to be assigned
  	var getNextExcoIndex = function(timeslot){
  		var nextIndex = null
  		console.log($scope.excos.length);
  		for (var index in $scope.excos){
  			//current exco is available during the current timeslot
  			// console.log($scope.excos[index].avail[timeslot]);
  			if($scope.excos[index].avail[timeslot]){
  				// console.log("avail");
  				//current timeslot is not assigned the current exco.
	  			if (!$scope.assignment[timeslot].has($scope.excos[index].name)){
	  				
	  				if (nextIndex == null){
	  					nextIndex = index;
	  				}
	  				else if($scope.excos[index].shiftAvailable < $scope.excos[nextIndex].shiftAvailable){
	  					nextIndex = index;
	  				}
	  				else if($scope.excos[index].shiftAvailable == $scope.excos[nextIndex].shiftAvailable){
	  					if($scope.excos[index].shiftAssigned < $scope.excos[nextIndex].shiftAssigned){
	  						nextIndex = index;
	  					}
	  				}
	  			}	
  			}
  			
  			
  		}
  		return nextIndex;
  	};

  	$scope.assignment = {}
  	$scope.shiftArrangement = function(){

  		$scope.addExco = false;
  		$scope.result = true;
  		for(var i =0; i< $scope.excos.length; i++){
  			console.log("exco",$scope.excos[i].name);
  		}
  		for (var key in $scope.timeslot){
  			$scope.assignment[key] = new Set();
  		}
  		var nextTimeslot = getNextTimeslot();
  		console.log(nextTimeslot);
  		while(nextTimeslot != null){
  			console.log("n",nextTimeslot);
  			// console.log($scope.assignment[nextTimeslot].size);
  			// console.log($scope.timeslot[nextTimeslot]);
  			while($scope.assignment[nextTimeslot].size < min([3,$scope.timeslot[nextTimeslot]])){
  				var nextExcoIndex = getNextExcoIndex(nextTimeslot);
  				console.log(nextExcoIndex);
  				if (nextExcoIndex == null) break;
  				$scope.excos[nextExcoIndex].shiftAssigned += 1;
  				$scope.assignment[nextTimeslot].add($scope.excos[nextExcoIndex].name);
  				console.log(nextTimeslot,$scope.assignment[nextTimeslot].size);
  			}
  			nextTimeslot = getNextTimeslot();

  		}
  		for (var key in $scope.timeslot){

	  		console.log(key);
	  		
	  		for(let i of $scope.assignment[key]) { 
	  			// console.log(i)
	  			// console.log($scope.excos[i].name, $scope.excos[i].shiftAssigned, $scope.excos[i].shiftAvailable); 
	  		}
	  		$scope.assignment[key] = Array.from($scope.assignment[key]);
	  		console.log($scope.assignment[key]);
  		}


  	};

   

  	

});


