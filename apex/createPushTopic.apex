PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'BundleStatusChange';
pushTopic.Query = 'SELECT Id, Status__c FROM Bundle__c';
pushTopic.ApiVersion = 44.0;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;