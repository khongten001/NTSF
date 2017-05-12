({
	doInit: function (component, event, helper) {
        // Further functionality
	},

	dataSourceChanged: function (component, event, helper) {
		// Rerender table
		helper.renderTable(component);
	},

	checkboxSelect: function (component, event, helper) {
		// Extract row, column data
		var rowColumnInfo = helper.extractRowAndColumnFromString(event.getSource().get('v.class'));
		// Sync data
		helper.syncRowData(component, rowColumnInfo[0]);
		// Prepair parameters of event
		var privateData = component.get('v.privateData');
		var refNode = privateData.rows[rowColumnInfo[0]][0].refNode;
		helper.createAndFireEvent(component, 'onNTSFTableCheckboxChanged', {'node': refNode, 'column': rowColumnInfo[1]});
		// Toggle header checkbox
		helper.checkCheckedAll(component, event);
	},

	clickCell: function (component, event, helper) {
		// Prepair parameters of event
		var privateData = component.get('v.privateData');
		var refNode = privateData.rows[event.currentTarget.dataset.rowid][0].refNode;
		// Fire event
		helper.createAndFireEvent(component, 'onNTSFTableCellClick', {'node': refNode, 'column': event.currentTarget.dataset.columnid});
	},

	clickRow: function (component, event, helper) {
		// Prepair parameters of event
		var privateData = component.get('v.privateData');
		var refNode = privateData.rows[event.currentTarget.dataset.rowid][0].refNode;
		// Fire event
		helper.createAndFireEvent(component, 'onNTSFTableRowClick', {'node': refNode});
	},

	selectAll: function (component, event, helper) {
		// Get header checkbox value
		var checked = event.getSource().get('v.value');
		// Get column index of header checkbox
		var column = helper.extractRowAndColumnFromString(event.getSource().get('v.class'))[1];
		// Get all checkboxes
		var checkBoxes = component.find('ntsfTableCheckbox');
		// Check checkBoxes children belong to "column" or not
		for (var i = 0; i < checkBoxes.length; i++) {
			try {
				var infor = helper.extractRowAndColumnFromString(checkBoxes[i].get('v.class'));
				// Set child value to header value
				if (infor[1] == column) {
					checkBoxes[i].set('v.value', checked);
				}
			} catch (e) {
			}

		}
		// Sync data
		helper.syncAllData(component);
	},

	clickButton: function (component, event, helper) {
		// Extract row, column data
		var rowColumnInfo = helper.extractRowAndColumnFromString(event.getSource().get('v.class'));
		var privateData = component.get('v.privateData');
		var refNode = privateData.rows[rowColumnInfo[0]][0].refNode;
		// Fire event
		helper.createAndFireEvent(component, 'onNTSFTableButtonClick', {'node': refNode, 'column': rowColumnInfo[1]});
	}
});