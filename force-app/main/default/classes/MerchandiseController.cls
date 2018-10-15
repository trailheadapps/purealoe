global with sharing class MerchandiseController {
    
    @AuraEnabled(cacheable=true)
    public static List<String> getCategories() {
        Schema.DescribeFieldResult result = Merchandise__c.Category__c.getDescribe();
        List<Schema.PicklistEntry> entries = result.getPicklistValues();
        List<String> values = new list <String>();
        for (Schema.PicklistEntry entry: entries) {
            values.add(entry.getValue());
        }
        return values;
    }
    
    
    public class PagedResult {
        
        @AuraEnabled
        public Integer pageSize { get;set; }
        
        @AuraEnabled
        public Integer page { get;set; }
        
        @AuraEnabled
        public Integer total { get;set; }
        
        @AuraEnabled
        public List<Merchandise__c> items { get;set; }
        
    }
    
    public class Filter {
        
        @AuraEnabled
        public String searchKey { get;set; }
        
        @AuraEnabled
        public String category { get;set; }
        
        @AuraEnabled
        public Decimal minPrice { get;set; }
        
        @AuraEnabled
        public Decimal maxPrice { get;set; }
        
    }
    
    @AuraEnabled(cacheable=true)
    public static PagedResult getMerchandise(String filters, Decimal pageSize, Decimal pageNumber) {
        Filter filter = (Filter) JSON.deserializeStrict(filters, MerchandiseController.Filter.class);
        Integer pSize = (Integer)pageSize;
        String key = '%' + filter.searchKey + '%';
        Integer offset = ((Integer)pageNumber - 1) * pSize;
        PagedResult r =  new PagedResult();
        r.pageSize = pSize;
        r.page = (Integer) pageNumber;
        r.total = [SELECT count() FROM Merchandise__c
                   WHERE name LIKE :key
                   AND Category__c like : (filter.category == '' ? '%' : filter.category)
                   AND Price__c >= :filter.minPrice AND Price__c <= :filter.maxPrice];
        r.items = [SELECT id, Name, Title__c, Description__c, Price__c, Category__c, Picture_URL__c FROM Merchandise__c
                      WHERE Name LIKE :key
                      AND Category__c like : (filter.category == '' ? '%' : filter.category)
                      AND Price__c >= :filter.minPrice AND Price__c <= :filter.maxPrice
                      LIMIT :pSize OFFSET :offset];
        return r;
    }
    
    @AuraEnabled(cacheable=true)
    public static Merchandise__c[] getAllMerchandise() {
        return [SELECT id, Name, Title__c, Description__c, Price__c, Category__c, Picture_URL__c 
                    FROM Merchandise__c];
    }
}