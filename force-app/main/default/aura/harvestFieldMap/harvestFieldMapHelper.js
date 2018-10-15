({
        subscribe: function (component) {
            var empApi = component.find("empApi");
            var channel = component.get("v.channel");
            var replayId = -2;
            empApi.subscribe(channel, replayId, $A.getCallback(function (message) {
                var fields = component.get("v.harvestFields");
                for (var i=0; i<fields.length; i++) {
                    console.log(fields[i].Id);
                    if (fields[i].Id == message.Field_Id__c ) {
                        fields[i].Status__c = message.Status__c;
                        this.renderFields(component);
                        break;
                    }
                }
            }));        
        },

        transform: function (component) {
            var svgWrapper = component.find("svgWrapper").getElement();
            svgWrapper.style.transform = "translate3d(" + component.translateX + "px," + component.translateY + "px, 0) " +
                "scale(" + component.scale + "," + component.scale + ")";
        },
        
        renderFields : function(component) {
            var svgWrapper = component.find("svgWrapper");
            if (!svgWrapper) {
                return;
            }
            var svgWrapperEl = svgWrapper.getElement();
            if (!svgWrapperEl) {
                return;
            }
            var fields = component.get("v.harvestFields");
            if (!fields) {
                return;
            }
            var fieldEl;
            var dropEl;
            var labelEl;
            for (var i=0; i<fields.length; i++) {
                fieldEl = svgWrapperEl.getElementsByClassName('field' + fields[i].Map_Id__c);
                if (fieldEl && fieldEl[0]) {
                    var color = "#719344";
                    if (fields[i].Status__c === 'Alert') {
                        color = "#BD3833";
                    } else if (fields[i].Status__c === 'Warning') {
                        color = "#FFB75D";
                    } 
                    fieldEl[0].style.fill = color;
                }
                dropEl = svgWrapperEl.getElementsByClassName('drop' + fields[i].Map_Id__c);
                if (dropEl && dropEl[0]) {
                    dropEl[0].style.display = fields[i].Irrigation__c ? 'block' : 'none';
                }
                labelEl = svgWrapperEl.getElementsByClassName('label' + fields[i].Map_Id__c);
                if (labelEl && labelEl[0]) {
                    labelEl[0].children[0].textContent = fields[i].Name;
                }
            }
        },
    
    })