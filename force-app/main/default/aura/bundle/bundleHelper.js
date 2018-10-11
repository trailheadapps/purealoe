({
    loadBundleItems: function (component, bundleId) {
        var action = component.get("c.getBundleItems");
        action.setParams({
            "bundleId": bundleId
        });
        action.setCallback(this, function (response) {
            var result = response.getReturnValue();
            var bundleItems = [];
            result.forEach(function(item) {
                var bundle = {
                    id: item.Id,
                    merchandiseId: item.Merchandise__r.Id,
                    name: item.Merchandise__r.Name,
                    title: item.Merchandise__r.Title__c,
                    price: item.Merchandise__r.Price__c,
                    category: item.Merchandise__r.Category__c,
                    pictureURL: item.Merchandise__r.Picture_URL__c,
                    qty: item.Qty__c
                };
                bundleItems.push(bundle);
            });
            component.set("v.bundleItems", bundleItems);
            this.calculateBundle(component);
        });
        $A.enqueueAction(action);
    },

    addItem: function (component, bundleItem) {
        var action = component.get("c.addBundleItem");
        action.setParams({
            "bundleId": bundleItem.bundleId,
            "productId": bundleItem.merchandiseId,
            "qty": bundleItem.qty
        });
        action.setCallback(this, function (response) {
            var result = response.getReturnValue();
            bundleItem.id = result.Id;
            this.calculateBundle(component);
        });
        $A.enqueueAction(action);
    },

    updateItem: function (component, bundleItem) {
        var action = component.get("c.updateBundleItem");
        action.setParams({
            "bundleItem": {
                "Id": bundleItem.id,
                "Qty__c": bundleItem.qty
            }
        });
        action.setCallback(this, function (response) {
            this.calculateBundle(component);
        });
        $A.enqueueAction(action);
    },

    removeItem: function (component, bundleItem) {
        var action = component.get("c.removeBundleItem");
        action.setParams({
            "bundleItemId": bundleItem.id
        });
        action.setCallback(this, function (response) {
            var result = response.getReturnValue();
            var bundleItems = component.get("v.bundleItems");
            for (var i = 0; i < bundleItems.length; i++) {
                if (bundleItems[i].id === bundleItem.id) {
                    bundleItems.splice(i, 1);
                    component.set("v.bundleItems", bundleItems);
                    this.calculateBundle(component);
                    return;
                }
            }
        });
        $A.enqueueAction(action);
    },

    calculateBundle: function (component) {
        var bundleItems = component.get("v.bundleItems");
        var oldTotalMSRP = component.get("v.totalMSRP");
        var totalQty = 0;
        var totalMSRP = 0;
        if (bundleItems && Array.isArray(bundleItems)) {
            bundleItems.forEach(function (bundleItem) {
                totalQty = totalQty + bundleItem.qty;
                totalMSRP = totalMSRP + (bundleItem.qty * bundleItem.price);
            });
            component.set("v.totalQty", totalQty);
            component.set("v.totalMSRP", totalMSRP);
            var totalMSRPEl = component.find("totalMSRP");
            if (totalMSRPEl && totalMSRPEl.getElement()) {
                var numAnim = new CountUp(totalMSRPEl.getElement(), oldTotalMSRP, totalMSRP, 0, 0.5);
                numAnim.start();
            }
        }
    },


})