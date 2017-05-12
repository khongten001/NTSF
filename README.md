# NTSF
Components for Salesforce Lightning

## NTFSTable

**Data table component for Salesforce Lightning**

### Features:

*Supported date types:*
- [x] Text
- [x] Boolean
- [x] Datetime

*Supported controls:*
- [x] Text
- [x] Checkbox
- [x] Button

*Supported events:*
- [x] Cell click
- [x] Row click
- [x] Checkbox changed
- [x] Button click

*Todo:*
- [ ] Support colspan attribute
- [ ] Support rowspan attribute
- [ ] Inline Editting

**Example:**

If you want a table like this:

![capture](https://cloud.githubusercontent.com/assets/16706272/25981672/ba5bba82-3700-11e7-9920-3284233c805f.PNG)

And you have data:

```
[
  {'bool': true, 
    'value': 'Text 1', 
    'text': 'Text for checkbox 1', 
    'date': '2015-10-2T10:17:08z', 
    'button': 'Button 1'},
    
  {'bool': false, 
    'value': 'Text 2', 
    'text': 'Text for checkbox 2', 
    'date': '2014-09-29T00:17:08z', 
    'button': 'Button 2'}
]
```

### Define table column:

**Syntax:**
```xml
  <columns>
    <column 
      fieldValue='NAME OF FIELD OF DATA OBJECT WILL BE DISPLAY AND/OR PROCESSED' 
      fieldType='WHICH CONTROL WILL BE USED TO DISPLAY DATA (Checkbox, Button...)' 
      fieldText='NAME OF FIELD OF DATA OBJECT WILL BE USED FOR DISPLAYING TOOLTIP OR TEXT OF CHECKBOX'
      caption='CAPTION OF COLUMN HEADER'/> <!-- First column -->
    <!-- Second column -->
    ...
  </columns>
```

Replace **<** by **[** and **>** by **]** then put into template attribute:

```html
  <c:NTSFTable dataSource="{!YOUR DATA ATTRIBUTE HERE}"
    template="
      [columns]
        [column fieldValue='bool'   fieldType='boolean'  fieldText='text'  caption='Checkbox column' /]
        [column fieldValue='value'  fieldType='text'     fieldText='value' caption='Text column'     /]
        [column fieldValue='date'   fieldType='datetime'                   caption='Datetime column' /]
        [column fieldValue='button' fieldType='button'                     caption='Button column'   /]
      [/columns]" tableName="table1">

  </c:NTSFTable>
```

**Result:**

![2017-05-12_11-33-16](https://cloud.githubusercontent.com/assets/16706272/25982460/e39034f4-3706-11e7-92e6-f79f87290eb5.gif)

