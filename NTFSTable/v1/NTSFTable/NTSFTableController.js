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
		var rowColumnInfo = helper.extractRowAndColumnFromString(event.currentTarget.className);
		// Get all checkboxes
		var checkBoxes = component.find('ntsfTableCheckbox');
		// Check checkBox item is in clicking event
		for (var i = 0; i < checkBoxes.length; i++) {
			try {
				var info = helper.extractRowAndColumnFromString(checkBoxes[i].get('v.class'));
				// Set value
				if ((info[0] == rowColumnInfo[0]) && (info[1] == rowColumnInfo[1])) {
					checkBoxes[i].set('v.value', checkBoxes[i].get('v.value') == false);
					break;
				}
			} catch (e) {
			}

		}


		// Sync data
		helper.syncRowData(component, rowColumnInfo[0]);
		// Prepair parameters of event
		var privateData = component.get('v.privateData');
		var refNode = privateData.rows[rowColumnInfo[0]][0].refNode;
		helper.createAndFireEvent(component, 'onNTSFTableCheckboxChanged', {'node': refNode, 'column': rowColumnInfo[1]});
		// Toggle header checkbox
		helper.checkCheckedAll(component, rowColumnInfo[1]);
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
				var info = helper.extractRowAndColumnFromString(checkBoxes[i].get('v.class'));
				// Set child value to header value
				if (info[1] == column) {
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
	},

	doGetSelectedCount: function (component, event, helper) {
		var privateData = component.get('v.privateData');
		var args = event.getParam('arguments');
		var column = args.column;
		var result = 0;

		privateData.rows.forEach(function (row) {
			if (row[column].data) {
				result = result + 1;
			}
		});
		component.set('v.result', result);

	}
});