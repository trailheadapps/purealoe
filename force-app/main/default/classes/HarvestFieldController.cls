global with sharing class HarvestFieldController {

    @AuraEnabled
    public static List<Harvest_Field__c> getHarvestFields() {
        return [SELECT Id, Name, Crop__c, Size__c, Status__c, Map_Id__c, Yield__c, Irrigation__c, Picture_URL__c 
                FROM Harvest_Field__c LIMIT 20];
    }

}