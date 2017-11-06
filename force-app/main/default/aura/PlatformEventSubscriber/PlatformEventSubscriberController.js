({
    onJSLoaded: function(component, event, helper) {
        var action = component.get("c.getSessionId");
        action.setCallback(this, function(response) {
            var sessionId = response.getReturnValue();
            var cometd = new window.org.cometd.CometD();
            cometd.configure({
                url: window.location.protocol + '//' + window.location.hostname + '/cometd/41.0/',
                requestHeaders: { Authorization: 'OAuth ' + sessionId},
                appendMessageTypeToURL : false
            });
            cometd.websocketEnabled = false;
            
            cometd.handshake($A.getCallback(function(status) {
                if (status.successful) {
                    var eventName = component.get("v.eventName");
                    cometd.subscribe('/event/' + eventName, $A.getCallback(function(message) {
                            var messageEvent = component.getEvent("onMessage");
                            messageEvent.setParam("message", message.data.payload);
                            messageEvent.fire();
                        }
                    ));
                }
            }));

        });
        $A.enqueueAction(action);
    }

})