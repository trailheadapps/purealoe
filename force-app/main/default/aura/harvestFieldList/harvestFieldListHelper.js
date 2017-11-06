({
    buildTreeData : function(fields) {

        var map = {};
        var items = [];

        fields.forEach(function(field) {
            console.log(field);
            if (!map[field.Crop__c]) {
                map[field.Crop__c] = [];
            }
            map[field.Crop__c].push({
                label: field.Name,
                name: field.Id,
                expanded: false,
                
            });
        });

        for (var key in map) {
            items.push({
                label: key,
                expanded: false,
                items: map[key]
            })
        }

        items.sort(function(item1, item2) {
            return item1.label > item2.label;
        });

        // if (items.length> 0) {
        //     items[0].expanded = true;
        // }

        return items;

    }
})
