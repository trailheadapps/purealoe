({
	titleClickHandler: function(component) {
		var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
		      "recordId": component.get("v.merchandise").Id,
		      "slideDevName": "detail"
		    });
	    navEvt.fire();
	},

	dragStart : function(component, event) {
		var merchandise = component.get("v.merchandise");
        event.dataTransfer.setData("merchandise", JSON.stringify(merchandise));
	}
})