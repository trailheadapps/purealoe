({
    onInit : function(component, event, helper) {

        var columns = [
            {label: 'Name', fieldName: 'Name', type: 'text', sortable: true},
            {label: 'Crop', fieldName: 'Crop__c', type: 'text', sortable: true},
            {label: 'Size', fieldName: 'Size__c', type: 'text', sortable: true},
            {label: 'Irrigation', fieldName: 'Irrigation__c', type: 'number', sortable: true},
            {label: 'Status', fieldName: 'Status__c', type: 'text', sortable: true},
        ];

        component.set("v.columns", columns);

        var action = component.get("c.getHarvestFields");
        action.setCallback(this, function (response) {
            console.log('getHarvestFields: ' + (performance.now() - startTime));
            var fields = response.getReturnValue();
            component.set("v.tableData", fields);
            component.set("v.treeData", helper.buildTreeData(fields));
            // setTimeout(function() {
            //     console.log('--render');
            //     var content = component.find("content").getElement();
            //     console.log(content.innerHTML);
            //     if (content) {
            //         var items = content.getElementsByClassName('slds-tree__item')
            //         console.log(items.length);
            //     }
            // }, 5000);
        });
        var startTime = performance.now();
        $A.enqueueAction(action);

    },

    onMapView : function(component, event, helper) {
        component.set('v.viewMode', 'map');
        var map = component.find('map');
        $A.util.removeClass(map, 'slds-hide')
    },
        
    onTableView : function(component, event, helper) {
        var map = component.find('map');
        $A.util.addClass(map, 'slds-hide');
        component.set('v.viewMode', 'table');
    },
        
    onTreeView : function(component, event, helper) {
        var map = component.find('map');
        $A.util.addClass(map, 'slds-hide');
        component.set('v.viewMode', 'tree');
    },

    onRowSelection : function(component, event, helper) {
        component.set('v.selectedItems', event.getParam('selectedRows'));
    },

    onMapRecordSelection: function(component, event, helper) {
        component.set('v.selectedItems', event.getParam('selectedRecords'));
    },

    onTreeItemSelected : function(component, event, helper) {
        var recordId = event.getParam("name");
        if (recordId) {
            var selectEvent = $A.get("e.ltng:selectSObject");
            selectEvent.setParams({"recordId": recordId, channel: "HarvestFields"});
            selectEvent.fire();
        }
    },

    onAction: function(component) {
        component.set("v.popup", true);
    },

    closeDialog: function(component) {
        component.set("v.popup", false);
    },

    submitDialog: function(component) {
        component.set("v.popup", false);
        var fields = component.get("v.tableData");
        component.set("v.tableData", fields);
    },

})
