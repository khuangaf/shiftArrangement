app.filter('dateTime', function() {
    return function(x) {
        x = new Date(x);
        var month = x.getMonth()+1;
        var date = x.getDate();
        var hour = x.getHours();
        var nextHour = hour;
        var min = 0;
        var nextMin = 0;
        if (hour == 9 || hour == 12 || hour == 15){
            nextHour += 1;
            min = "00";
            nextMin = "30";
        }
        else{
            nextHour += 2;
            min = "30";
            nextMin = "00";
        }
        if (hour < 10) {
            console.log(123);
            hour = "0" + hour;
        }
        return month + "/" + date + " "+ hour + ":" + min + " - " + nextHour + ":" + nextMin;
        console.log(month);
    };
});