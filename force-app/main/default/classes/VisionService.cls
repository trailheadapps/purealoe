public class VisionService {

    static Id einsteinUserId;
    static Id fieldId;

    static {
        User user = [SELECT Id FROM USER WHERE NAME = 'Einstein Vision'];
        einsteinUserId = user.Id;
        Harvest_Field__c field = [SELECT Id FROM Harvest_Field__c WHERE NAME = 'Aloe SE-2'];
        fieldId = field.Id;
    }

    @InvocableMethod(label='Image Recognition')
    public static void recognizeImage(List<Id> feedItemId) {
        Id itemId = feedItemId[0]; // If bulk, only post first to avoid spamming
		Map<String,Object> payload = new Map<String,Object>();
		payload.put('feedItemId', itemId);
        String body = JSON.serialize(payload);    
        System.enqueueJob(new QueueableAction(feedItemId[0]));
    }
    
	public class QueueableAction implements System.Queueable, Database.AllowsCallouts {
        
        private final Id feedItemId;
        
        public QueueableAction(Id feedItemId) {
            this.feedItemId = feedItemId;
        }
        
        public void execute(System.QueueableContext ctx) {
            Boolean healthy = false;
            ConnectApi.FeedElement fe = ConnectApi.ChatterFeeds.getFeedElement(null, this.feedItemId);
            if (fe.capabilities.files != null) {
                FeedAttachment fa = [Select Id, RecordId FROM FeedAttachment WHERE FeedEntityId =: this.feedItemId LIMIT 1];
                ContentVersion content = [SELECT VersionData FROM ContentVersion WHERE Id =: fa.RecordId LIMIT 1];
                Einstein_PredictionService service = new Einstein_PredictionService(Einstein_PredictionService.Types.IMAGE);
                Einstein_PredictionResult result = service.predictImageBlob('S6Y5VQH5UD7RN3VTFVFSMNHIHQ', content.versionData, 0, '');
                if (result!=null) {
					Einstein_Probability probability = result.probabilities.get(0);
					if (probability.label.startsWith('healthy')) {
                        healthy = true;
					}
                }
            }
            String message;
            if (healthy) {
                message = 'This plant is healthy';
            } else {
                message = 'This plant is unhealthy and requires immediate attention';
                Field_Status_Change__e evt = new Field_Status_Change__e();
                evt.Field_Id__c = fieldId;
                evt.Status__c = 'Alert';
                EventBus.publish(evt);                            
            }
			FeedComment comment = new FeedComment();
    	    comment.FeedItemId = this.feedItemId;
        	comment.CommentBody = message;
            comment.createdById = VisionService.einsteinUserId;
            insert comment;
        }
    }
  
}