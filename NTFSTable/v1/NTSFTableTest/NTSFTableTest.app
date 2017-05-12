<aura:application extends="force:slds">
	<aura:attribute name="data" type="Object[]" default="[]"/>
	<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
	<aura:handler name="onNTSFTableRowClick" event="c:onNTSFTableRowClick" action="{!c.handleOnNTSFTableRowClick}"/>
	<aura:handler name="onNTSFTableCellClick" event="c:onNTSFTableCellClick" action="{!c.handleOnNTSFTableCellClick}"/>
	<aura:handler name="onNTSFTableCheckboxChanged" event="c:onNTSFTableCheckboxChanged" action="{!c.handleOnNTSFTableCheckboxChanged}"/>
	<aura:handler name="onNTSFTableButtonClick" event="c:onNTSFTableButtonClick" action="{!c.handleOnNTSFTableButtonClick}"/>


	<c:NTSFTable dataSource="{!v.data}"
		template="
			[columns]
				[column fieldValue='bool' fieldType='boolean' fieldText='text' caption='Checkbox column'/]
				[column fieldValue='value' fieldType='text' fieldText='value' caption='Text column'/]
				[column fieldValue='date' fieldType='datetime' caption='Datetime column'/]
				[column fieldValue='button' fieldType='button' caption='Button column'/]
			[/columns]" tableName="table1">

	</c:NTSFTable>
    
    
</aura:application>