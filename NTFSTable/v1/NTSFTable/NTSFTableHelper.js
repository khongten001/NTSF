({
	createAndFireEvent: function (component, eventName, params) {
		var event = component.getEvent(eventName);
		params.sender = component.get('v.tableName');
		event.setParams(params);
		event.fire();
	},

	syncRowData: function (component, rowIndex) {
		var privateData = component.get('v.privateData');
		var header = privateData.header;
		var rows = privateData.rows;
		var dataSource = component.get('v.dataSource');

		var row = rows[rowIndex];
		for (var i = 0; i < row.length; i++) {
			var meta = row[i].meta;
			var refNode = row[i].refNode;
			refNode[meta.field] = row[i].data;
		}
	},

	syncAllData: function (component) {
		var privateData = component.get('v.privateData');
		var header = privateData.header;
		var rows = privateData.rows;
		var dataSource = component.get('v.dataSource');
		// Don't use syncRowData because component.get will be called a lot of time
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			for (var j = 0; j < row.length; j++) {
				var meta = row[j].meta;
				var refNode = row[j].refNode;
				refNode[meta.field] = row[j].data;
			}
		}
	},

	parseDataSource: function (component) {
		var result = {'header': [], 'rows': []};
		var dataSource = component.get('v.dataSource');
		var markup = component.get('v.template').replace(new RegExp('\\[', 'g'), '<').replace(new RegExp('\\]', 'g'), '>');
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(markup, "text/xml");

		var columns = xmlDoc.getElementsByTagName('column');
		for (var i = 0; i < columns.length; i++) {
			var column = {
				'caption': columns[i].attributes.caption.value,
				'type': columns[i].attributes.fieldType.value,
				'field': columns[i].attributes.fieldValue.value,
				'format': typeof columns[i].attributes.format == 'undefined' ? '' : columns[i].attributes.format.value
			};


			result.header.push(column);
		}


		for (var i = 0; i < dataSource.length; i++) {
			var row = [];
			for (var j = 0; j < columns.length; j++) {
				var field = columns[j].attributes.fieldValue.value;
				var text = typeof columns[j].attributes.fieldText == 'undefined' ? '' : columns[j].attributes.fieldText.value;
				row.push({
					'data': typeof dataSource[i][field] == 'undefined' ? '' : dataSource[i][field],
					'text': typeof dataSource[i][text] == 'undefined' ? '' : dataSource[i][text],
					'meta': result.header[j],
					'refNode': dataSource[i]
				});
			}
			result.rows.push(row);
		}

		return result;
	},

	renderTable: function (component) {
		var privateData = this.parseDataSource(component);
		component.set('v.privateData', privateData);
	},

	extractRowAndColumnFromString: function (string) {
		var match = /ntsf\-table\-row\-([0-9]+)\-column-([0-9]+)/.exec(string);
		if (match != null) {
			return [+match[1], +match[2]];
		} else {
			return [0, 0];
		}
	},

	extractRowAndColumn: function (component, elementId) {
		// Get HTML content of component
		var componentHtml = component.getElements()[0].innerHTML;
		// Extract Html content of input control
		var regex = new RegExp('<[^<]+id="' + elementId + '"[^>]+>', 'i');
		var match = regex.exec(componentHtml);
		// Extract row, column data
		return this.extractRowAndColumnFromString(match[0]);
		/*
		 var match = /ntsf\-table\-row\-([0-9]+)\-column-([0-9]+)/.exec(match[0]);  
		 if (match != null) {
		 return [+match[1], +match[2]];
		 } else {
		 return [0, 0];
		 }
		 */
	},

	checkCheckedAll: function (component, event) {
		var privateData = component.get('v.privateData');
		var column = this.extractRowAndColumn(component, event.getSource().getGlobalId())[1];
		var checkedAll = true;

		privateData.rows.forEach(function (row) {
			if (!row[column].data) {
				checkedAll = false;
				return false;
			}
		});

		var checkBoxes = component.find('ntsfTableHeaderCheckbox');
		for (var i = 0; i < checkBoxes.length; i++) {
			try {
				var info = this.extractRowAndColumn(component, checkBoxes[i].getGlobalId());
				if (info[1] == column) {
					checkBoxes[i].set('v.value', checkedAll);
				}
			} catch (e) {
			}

		}
	}
});