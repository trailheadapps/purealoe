({
    subscribe: function (component, event) {
        var empApi = component.find("empApi");
        var channel = component.get("v.channel");
        var replayId = -2;
        empApi.subscribe(channel, replayId, $A.getCallback(function (message) {
            var bundle = component.get("v.record");
            if (message && message.data && message.data.sobject) {
                var bundleId = message.data.sobject.Id;
                var status = message.data.sobject.Status__c;
                if (bundleId === bundle.Id && status !== bundle.Status__c) {
                    component.find("bundleRecord").reloadRecord(true);
                }
            }
        }));        
    },

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
    }

})