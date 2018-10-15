global with sharing class BundleController {

    @AuraEnabled(cacheable=true)
    public static List<Bundle_Item__c> getBundleItems(Id bundleId) {
        return [SELECT Id, Merchandise__r.Name, Merchandise__r.Title__c, Merchandise__r.Price__c, Merchandise__r.Category__c, Merchandise__r.Picture_URL__c, Qty__c 
                FROM Bundle_Item__c
                WHERE Bundle__c = :bundleId];
    }
    
    @AuraEnabled
    public static Bundle_Item__c addBundleItem(Id bundleId, Id productId, Decimal qty) {
		Bundle_Item__c item = new Bundle_Item__c();
        item.Bundle__c = bundleId;
        item.Merchandise__c = productId;
        item.Qty__c = 10;
        insert item;
		return item;
    }
        
	@AuraEnabled
    public static Bundle_Item__c updateBundleItem(Bundle_Item__c bundleItem) {
        update bundleItem;
		return bundleItem;
    } 

	@AuraEnabled
    public static Bundle_Item__c removeBundleItem(Id bundleItemId) {
		Bundle_Item__c item = new Bundle_Item__c();
        item.Id = bundleItemId;
        delete item;
		return item;
    } 
    
}