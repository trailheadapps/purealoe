({
    onJSLoaded: function(component, event, helper) {
        var action = component.get("c.getSessionId");
        action.setCallback(this, function(response) {
            var sessionId = response.getReturnValue();
            var cometd = new window.org.cometd.CometD();
            component.cometd = cometd;
            cometd.configure({
                url: window.location.protocol + '//' + window.location.hostname + '/cometd/41.0/',
                requestHeaders: { Authorization: 'OAuth ' + sessionId},
                logLevel: 'debug',
                appendMessageTypeToURL : false
            });
            cometd.websocketEnabled = false;
            //cometd.unregisterTransport('long-polling');
            
            cometd.handshake($A.getCallback(function(status) {
                try {
                    console.log(status);
                    if (status.successful) {
                        var channel = component.get("v.channel");
                        console.log('## Handshake successful ' + channel);
                        component.subscription = cometd.subscribe(channel, $A.getCallback(function(msg) {
                                console.log('****** subscriber got message');
                                console.log(msg);
                                if (msg.channel === channel) {
                                    var messageEvent = component.getEvent("onMessage");
                                    if (messageEvent) {
                                        messageEvent.setParam("message", msg);
                                        messageEvent.fire();
                                    }
                                }
                            }
                        ));
                    } else {
                        console.log('## Handshake failed');
                        console.log(status);
                    }
                } catch (e) {
                    console.log("#### Exception");
                    console.log(e);
                }
            }));

        });
        $A.enqueueAction(action);
    },

    handleDestroy : function (component, event, helper) {
        // Ensure this component unsubscribes and disconnects from the server
		var cometd = component.cometd;
        var subscription = component.subscription;
        if (cometd && subscription) {
            cometd.unsubscribe(subscription, {}, function(unsubscribeReply) {
                if(unsubscribeReply.successful) {
                    cometd.disconnect(function(disconnectReply) 
                        { 
                            console.log('streaming component: Success unsubscribe')
                            if(disconnectReply.successful) {
                                console.log('streaming component: Success disconnect')
                            } else {
                                console.error('streaming component: Failed disconnect')                    
                            }
                        });
                } else {
                    console.error('streaming component: Failed unsubscribe')                    		    
                }
            });
        }
    }

})