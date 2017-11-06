({
    onClick : function(component, event, helper) {
        var actionEvent = component.getEvent("onaction");
        actionEvent.fire();
    }
})
