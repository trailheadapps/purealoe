({

    afterRender: function(component, helper) {
        this.superAfterRender();
        var svgWrapper = component.find("svgWrapper").getElement();
        var value = svgWrapper.innerText;
        value = value.replace("<![CDATA[", "").replace("]]>", "");
        svgWrapper.innerHTML = value;

        var fieldEl;
        var dropEl;
        var labelEl;
        var harvestField = component.get("v.harvestField"); 
        for (var i=0; i<20; i++) {
            fieldEl = svgWrapper.getElementsByClassName('field' + (i+1));
            if (fieldEl && fieldEl[0]) {
                fieldEl[0].style.fill = '#DDDDDD';
            }
            dropEl = svgWrapper.getElementsByClassName('drop' + (i+1));
            if (dropEl && dropEl[0]) {
                dropEl[0].style.display = 'none';
            }
            labelEl =svgWrapper.getElementsByClassName('label' + (i+1));
            if (labelEl && labelEl[0]) {
                labelEl[0].style.display = 'none';
            }
        }

        helper.renderField(component);
        
    }

})
