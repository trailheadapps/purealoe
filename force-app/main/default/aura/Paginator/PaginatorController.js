({
	previousPage : function(component) {
                var paginatorEvent = component.getEvent("previousPage");
                paginatorEvent.fire();
	},
    
	nextPage : function(component) {
                var paginatorEvent = component.getEvent("nextPage");
                paginatorEvent.fire();
	}
})