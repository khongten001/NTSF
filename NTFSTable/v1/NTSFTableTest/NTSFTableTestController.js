({
	doInit: function (component, event, helper) {
		var data = [
			{'bool': true, 'value': 'Text 1', 'text': 'Text for checkbox 1', 'date': '2015-10-2T10:17:08z', 'button': 'Button 1'},
			{'bool': false, 'value': 'Text 2', 'text': 'Text for checkbox 2', 'date': '2014-09-29T00:17:08z', 'button': 'Button 2'}];
		component.set('v.data', data);
	},

	handleOnButtonClick: function (component, event) {
		var node = event.getParam('sender');
		console.log(node);
	},

	handleOnCellClick: function (component, event) {
		var node = event.getParam('sender');
		console.log(node);
	},

	handleOnNTSFTableCheckboxChanged: function (component, event) {
		console.log(event.getParams().column);
	},

	handleOnNTSFTableCellClick: function (component, event) {
		console.log(event.getParams().column);
	}
});