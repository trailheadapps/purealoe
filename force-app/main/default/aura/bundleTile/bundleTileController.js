({
	titleClickHandler: function(component) {
		var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
		      "recordId": component.get("v.bundleItem").merchandiseId,
		      "slideDevName": "detail"
		    });
	    navEvt.fire();
	},

	deleteHandler : function(component) {
        var deleteEvent = component.getEvent("onDelete");
        deleteEvent.setParam("bundleItem", component.get("v.bundleItem"));
        deleteEvent.fire();
	},

	qtyChangeHandler: function(component, event) {
		var qty = event.getSource().get('v.value');
		var bundleItem = component.get("v.bundleItem");
		if (qty !== bundleItem.qty) {
			bundleItem.qty = parseInt(qty, 10);
	        var changeEvent = component.getEvent("onChange");
	        changeEvent.setParam("bundleItem", bundleItem);
	        changeEvent.fire();
		}
	}

})