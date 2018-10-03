({
    onInit : function(component, event, helper) {

        helper.subscribe(component);

        component.selectedFields = [];
        component.selectedRecords = [];
        // Initialize CSS transform values
        component.scale = 1;
        component.translateX = 0;
        component.translateY = 0;

        document.addEventListener("mouseup", function(event) {

            var classList = event.target.classList;
            var fieldId;
    
            if (classList && classList[0]) {
                fieldId = classList[0];
            } else {
                component.mouseDown = false;
                component.dragging = false;
                return;
            }
    
            if (component.dragging) {
    
                component.dragging = false;
    
            } else if (fieldId.substring(0, 5) == "field") {
    
                if (!event.shiftKey) {
                    // Unselect fields that are currently selected
                    component.selectedFields.forEach(function(selectedField) {
                        selectedField.style.strokeWidth = 0;
                    })
                    component.selectedFields = [];
                    component.selectedRecords = [];
                }
    
                var el = event.target;
                el.style.stroke = "#FF0000";
                el.style.strokeWidth = 16;
                component.selectedFields.push(el);
    
                var selectedRecord;
                var fields = component.get("v.harvestFields");
                for (var i=0; i<fields.length; i++) {
                    if (fieldId == 'field' + fields[i].Map_Id__c) {
                        selectedRecord = fields[i];
                    }
                }
    
                if (selectedRecord) {
                    component.selectedRecords.push(selectedRecord);

                    component.set("v.recordId", selectedRecord.Id);
                    component.find("service").reloadRecord();

                    var selectionChangeEvent = component.getEvent("onselectionchange");
                    selectionChangeEvent.setParam("selectedRecords", component.selectedRecords);
                    selectionChangeEvent.fire();
    
                    var selectEvent = $A.get("e.ltng:selectSObject");
                    selectEvent.setParams({"recordId": selectedRecord.Id, channel: "HarvestFields"});
                    selectEvent.fire();
                }
    
            }
            component.mouseDown = false;
            component.dragging = false;
    
        });
    },

    handleZoomChange : function(component, event, helper) {
        component.scale = event.getParam("value");
        helper.transform(component);
    },

    onMouseDown : function(component, event, helper) {
        component.mouseDown = true;
    },

    onMouseMove: function(component, event, helper) {
        if (component.mouseDown) {
            component.dragging = true;
            var svgWrapper = component.find("svgWrapper").getElement();
            var style = window.getComputedStyle(svgWrapper);
            var matrix = new WebKitCSSMatrix(style.webkitTransform);
            component.translateX = matrix.m41 + event.movementX;
            component.translateY = matrix.m42 + event.movementY;
            helper.transform(component);
        }
    },

    onMouseUp : function(component, event, helper) {
        var classList = event.target.classList;
        var fieldId;

        if (classList && classList[0]) {
            fieldId = classList[0];
        } else {
            return;
        }

        if (component.dragging) {

            component.dragging = false;

        } else if (fieldId.substring(0, 5) == "field") {

            if (!event.shiftKey) {
                // Unselect fields that are currently selected
                component.selectedFields.forEach(function(selectedField) {
                    selectedField.style.strokeWidth = 0;
                })
                component.selectedFields = [];
                component.selectedRecords = [];
            }

            var el = event.target;
            el.style.stroke = "#FF0000";
            el.style.strokeWidth = 16;
            component.selectedFields.push(el);

            var selectedRecord;
            var fields = component.get("v.harvestFields");
            if(fields){
                for (var i=0; i<fields.length; i++) {
                    if (fieldId == 'field' + fields[i].Map_Id__c) {
                        selectedRecord = fields[i];
                    }
                } 
            }

            if (selectedRecord) {
                component.selectedRecords.push(selectedRecord);
                var selectionChangeEvent = component.getEvent("onselectionchange");
                selectionChangeEvent.setParam("selectedRecords", component.selectedRecords);
                selectionChangeEvent.fire();

                var selectEvent = $A.get("e.ltng:selectSObject");
                selectEvent.setParams({"recordId": selectedRecord.Id, channel: "HarvestFields"});
                selectEvent.fire();
            }

        }
        component.mouseDown = false;
        component.dragging = false;
    },

    onIrrigationChange : function(component, event) {
        var svgWrapper = component.find("svgWrapper").getElement();
        var el = svgWrapper.getElementsByClassName('drop' + event.getParam('mapId'));
        if (el && el[0]) {
            if (event.getParam('status')) {
                el[0].style.display = "block";    
            } else {
                el[0].style.display = "none";    
            }
        }
    },        

    // The current record was updated by another component
    recordUpdatedHandler : function(component, event) {
        var changeType = event.getParams().changeType;
        if (changeType === "CHANGED") {
            var service = component.find("service");
            service.reloadRecord();
            var svgWrapper = component.find("svgWrapper").getElement();
            var field = component.get("v.selectedRecord");
            var dropEl = svgWrapper.getElementsByClassName('drop' + field.Map_Id__c);
            if (dropEl && dropEl[0]) {
                dropEl[0].style.display = field.Irrigation__c ? 'block' : 'none';
            }
        }    
    },

    harvestFieldsChange : function(component, event, helper) {
    	helper.renderFields(component);   
    }
    
})