({
	doInit: function (component, event, helper) {
		var data = [
			{'bool': true, 'value': 'Text 1', 'text': 'Text for checkbox 1', 'date': '2015-10-2T10:17:08z', 'button': 'Button 1'},
			{'bool': false, 'value': 'Text 2', 'text': 'Text for checkbox 2', 'date': '2014-09-29T00:17:08z', 'button': 'Button 2'}];
		component.set('v.data', data);
	},

	handleOnNTSFTableButtonClick: function (component, event) {
		alert('Button was clicked');
	},

	handleOnNTSFTableRowClick: function (component, event) {
		alert('Row was clicked');
	},

	handleOnNTSFTableCheckboxChanged: function (component, event) {
		alert('Checkbox value was changed');
	},

	handleOnNTSFTableCellClick: function (component, event) {
		alert('Cell was clicked');
	},

	clickButtonSelectedCount: function (component, event) {
		var table = component.find('testTableId');
		var column = 0;
		table.doGetSelectedCount(column);
		alert(table.get('v.result'));
	}
});