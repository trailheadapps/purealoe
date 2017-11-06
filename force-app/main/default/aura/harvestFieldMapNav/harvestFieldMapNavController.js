({

    onInit: function (component, event, helper) {
        var action = component.get("c.getHarvestFields");
        action.setCallback(this, function (response) {
            var fields = response.getReturnValue();
            component.set("v.harvestFields", fields);
        });
        $A.enqueueAction(action);
    },

    onRecordUpdated: function (component, event, helper) {
        helper.renderField(component);
    },

    onMapClick: function (component, event, helper) {
        var fields = component.get("v.harvestFields");
        var fieldId = event.target.classList;
        if (fieldId && fieldId[0] && fieldId[0].substring(0, 5) == "field") {
            var mapId = fieldId[0].substring(5);
            fields.forEach(function(field) {
                if (field.Map_Id__c == mapId) {
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": field.Id,
                        "slideDevName": "detail"
                    });
                    navEvt.fire();
                }
            });
        }
    }

})
