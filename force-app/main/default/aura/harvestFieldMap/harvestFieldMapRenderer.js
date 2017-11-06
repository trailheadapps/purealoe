({
    afterRender: function(component, helper) {
        this.superAfterRender();
        var svgWrapper = component.find("svgWrapper");
        var value = svgWrapper.getElement().innerText;
        value = value.replace("<![CDATA[", "").replace("]]>", "");
        svgWrapper.getElement().innerHTML = value;
    }
})