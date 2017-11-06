({
    loadRelatedData : function(component) {

        // Simulated data in this demo
        var harvests = [
            {harvestDate: '09/09/2017', qty: '354 lbs', supervisor: 'Nelson'},
            {harvestDate: '08/05/2017', qty: '301 lbs', supervisor: 'Nelson'},
            {harvestDate: '09/10/2016', qty: '299 lbs', supervisor: 'Nelson'},
            {harvestDate: '09/09/2015', qty: '354 lbs', supervisor: 'Nelson'},
        ];
        component.set("v.harvests", harvests);
        
        var irrigationHistory = [
            {when: '12 hours ago', duration: '60 minutes', volume: '10 liters'},
            {when: '18 hours ago', duration: '30 minutes', volume: '5 liters'},
        ];
        component.set("v.irrigationHistory", irrigationHistory);
    }

})