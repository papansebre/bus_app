/**************** AMENTITY ******************/
App.filter('selectedAmentity', function() {
    return function(bus, amt) {
        return bus.filter(function(tasks) {
            if(amt !=''){
            for (var i in tasks.amenities) {
                if (amt.indexOf(tasks.amenities[i]) != -1) {
                    return true;
                }
            }
            return false;
            }else{
				return bus;
			}
        });
    };
});


/******************** DROPPING POINT **********************/
App.filter('selecteddrop', function() {
    return function(tasksdrop, drop) {
        return tasksdrop.filter(function(tasks) {
            if(drop !=''){
            for (var i in tasks.singleD) {
                if (drop.indexOf(tasks.singleD[i]) != -1) {
                    return true;
                }
            }
            return false;
            }else{
                return tasksdrop;
            }
        });
    };
});

/******************** BOARDING POINT **********************/

App.filter('selectedBrd', function() {
    return function(bus, bp) {
        return bus.filter(function(task) {
            if(bp !=''){
            for (var i in task.singleP) {
                if (bp.indexOf(task.singleP[i]) != -1) {
                    return true;
                }
            }
            return false;
            }else{
                return bus;
            }

        });
    };
});