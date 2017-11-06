({
	calculateStepIndex : function(component) {
        var steps = component.get("v.steps");
        var currentStep = component.get("v.currentStep");
        var stepIndex = steps.indexOf(currentStep);
        component.set("v.stepIndex", stepIndex);
    },

	onStepClicked : function(component, event) {
        var step = event.currentTarget.dataset.step;
        component.set("v.currentStep", step);
        var stepChangeEvent = component.getEvent("stepChange");
		stepChangeEvent.setParam("step", step);
		stepChangeEvent.fire();
	}
})