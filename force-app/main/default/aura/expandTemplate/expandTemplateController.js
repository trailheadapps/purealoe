({
    toggle : function(component, event, helper) {
        component.set("v.fullScreen", !component.get("v.fullScreen"));
        $A.util.toggleClass(component.find("container"), 'fullscreen');
        var leftColumn = component.find("leftColumn");
        $A.util.toggleClass(leftColumn, 'slds-size_6-of-12');
        $A.util.toggleClass(leftColumn, 'slds-size_12-of-12');
    }
})
