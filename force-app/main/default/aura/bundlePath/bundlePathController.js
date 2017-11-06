({
    onStepChange: function (component, event) {
        var bundle = component.get("v.record");
        if (bundle) {
            bundle.Status__c = event.getParam("step");
            component.find("bundleRecord").saveRecord($A.getCallback(function (saveResult) {
                console.log("v.record");
                console.log(component.get("v.record"));
            }));
        }
    },

    onRecordUpdated: function (component, event) {
        var changeType = event.getParams().changeType;
        if (changeType === "LOADED") {
            component.find("accountService").reloadRecord();
        } else if (changeType === "CHANGED") {
            component.find("bundleRecord").reloadRecord();
            component.find("accountService").reloadRecord();
        }
    },

    messageHandler: function (component, event) {
        var bundle = component.get("v.record");
        var payload = event.getParam("message");
        if (payload.Bundle_Id__c === bundle.Id) {
            bundle.Status__c = "Ordered by Distributor";
            bundle.Account__c = payload.Account_Id__c;
            bundle.Date_Ordered__c = new Date().toLocaleDateString();
            component.set("v.record", bundle);
            component.find("accountService").reloadRecord();
            // No need to save the record because there is also an Apex listener for the Bundle_Ordered__e event

        }
    }

})