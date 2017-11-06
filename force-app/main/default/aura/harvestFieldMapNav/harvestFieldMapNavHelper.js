({
    renderField : function(component) {
        var field = component.get("v.harvestField");
        var fieldEl;
        var dropEl;
        var svgWrapper = component.find("svgWrapper");
        if (!field) {
            return;
        }
        if (!svgWrapper) {
            return;
        }
        var svgWrapperEl = svgWrapper.getElement();
        if (!svgWrapperEl) {
            return;
        }
        fieldEl = svgWrapperEl.getElementsByClassName('field' + field.Map_Id__c);
        if (fieldEl && fieldEl[0]) {
            var color = "#719344";
            if (field.Status__c === 'Alert') {
                color = "#BD3833";
            } else if (field.Status__c === 'Warning') {
                color = "#FFB75D";
            }
            fieldEl[0].style.fill = color;
        }
        dropEl = svgWrapperEl.getElementsByClassName('drop' + field.Map_Id__c);
        if (dropEl && dropEl[0]) {
            dropEl[0].style.display = field.Irrigation__c ? 'block' : 'none';
        }
    }
})
