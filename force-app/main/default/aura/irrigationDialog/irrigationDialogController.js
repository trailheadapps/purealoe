({
    onInit: function (component, event, helper) {
        var fields = component.get("v.harvestFields");
        var selectedFields = component.get("v.selectedHarvestFields");

        var options = [];
        fields.forEach(function(field) {
            options.push({
                value: field.Id,
                label: field.Name
            });
        });

        var value = [];
        selectedFields.forEach(function(field) {
            value.push(field.Id);
        });
        component.set("v.options", options);
        component.set("v.value", value);
    },

    closeDialog: function (component, event, helper) {
        var dialogEvent = component.getEvent("onclose");
        dialogEvent.fire();
    },

    submitDialog: function (component, event, helper) {
        var selectedIds = component.get("v.value");
        var fields = component.get("v.harvestFields");

        fields.forEach(function(field) {
            field.Irrigation__c = false;
        });

        selectedIds.forEach(function (id) {
            for (var i=0; i<fields.length; i++) {
                if (fields[i].Id == id) {
                    fields[i].Irrigation__c = true;
                    break;
                }
            }
        });
        var dialogEvent = component.getEvent("onsubmit");
        dialogEvent.fire();
    },

    handleListChange: function (component, event, helper) {
        var value = event.getParam("value");
        component.set("v.value", value);
    }

})