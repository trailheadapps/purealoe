({
    doInit : function(component, event, helper) {
        var bundleId = component.get("v.recordId");
        helper.loadBundleItems(component, bundleId);
        var columns = [
            {label: 'Name', fieldName: 'name', type: 'text'},
            {label: 'Category', fieldName: 'category', type: 'text'},
            {label: 'Price', fieldName: 'price', type: 'currency'},
            {label: 'Qty', fieldName: 'qty', type: 'number'},
        ];
        component.set("v.columns", columns);
    },

    dropHandler : function(component, event, helper) {
        event.preventDefault();
        var dropZone= component.find("dropZone");
        $A.util.removeClass(dropZone, 'active');
        var bundleItems = component.get("v.bundleItems");
        var merchandise = JSON.parse(event.dataTransfer.getData("merchandise"));
        var bundleItem = {
            bundleId: component.get("v.recordId"),
            merchandiseId: merchandise.Id,
            qty: 10,
            name: merchandise.Name,
            title: merchandise.Title__c,
            price: merchandise.Price__c,
            category: merchandise.Category__c,
            pictureURL: merchandise.Picture_URL__c
        };
        bundleItems.push(bundleItem);
        helper.addItem(component, bundleItem);
        component.set("v.bundleItems", bundleItems);
    },

    dragOverHandler : function(component, event) {
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.addClass(cmpTarget, 'active');
    },

    dragLeaveHandler : function(component, event){
        event.preventDefault();
        var cmpTarget= component.find("dropZone");
        $A.util.removeClass(cmpTarget, 'active');
    },

    bundleItemDeleteHandler : function(component, event, helper) {
        var bundleItem = event.getParam("bundleItem");
        helper.removeItem(component, bundleItem);
    },

    bundleItemChangeHandler : function(component, event, helper) {
        var bundleItem = event.getParam("bundleItem");
        helper.updateItem(component, bundleItem);
    },

})