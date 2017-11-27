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
        console.log('bundlePathController got message');
        try {
            var bundle = component.get("v.record");
            var message = event.getParam("message");
            if (message && message.data && message.data.sobject) {
                var bundleId = message.data.sobject.Id;
                var status = message.data.sobject.Status__c;
                console.log(status);
                if (bundleId === bundle.Id && status !== bundle.Status__c) {
                    //bundle.Status__c = status;
                    //bundle.Account__c = payload.Account_Id__c;
                    //bundle.Date_Ordered__c = new Date().toLocaleDateString();
                    //component.set("v.record", bundle);
                    component.find("bundleRecord").reloadRecord(true);
                    //component.find("accountService").reloadRecord();
                    // No need to save the record because there is also an Apex listener for the Bundle_Ordered__e event
                }
            }
        } catch (e) {
            console.log("*** Exception");
            console.log(e);
        }
    }

})