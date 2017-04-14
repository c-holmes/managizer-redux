import React from 'react';
import PropertySelectType from './PropertySelectType';

const PropertySelectTypeList = React.createClass({

	renderSelectOptionHeader(key){
		return <li key={key}>{key}</li>
	},
	
	renderSelectOptionField(selectOption){
		return <PropertySelectType details={this.props.property.selectOptions[selectOption.key]} selectOptionFields={this.props.selectOptionFields} key={selectOption.key} index={selectOption.key} propertyIndex={this.props.propertyIndex} propertyId={this.props.property._id} accountId={this.props.accountId} editSelectOption={this.props.editSelectOption} saveSelectOption={this.props.saveSelectOption} deleteSelectOption={this.props.deleteSelectOption} />
	},

	sortSelectOptions(selectOptionArray){
		var selectOptionsOrderArray = [];

		selectOptionArray.map(function(selectOption,key){
			if(selectOption !== null){
				//original key, order, name
				selectOptionsOrderArray.push({key:key, order:selectOption.order, name:selectOption.name});
			}
		}, this)

		//sort array by order
		selectOptionsOrderArray.sort(function(a,b){
			return a.order - b.order
		});

		//render out select options
		return selectOptionsOrderArray.map(this.renderSelectOptionField);
	},

	render(){
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						{Object.keys(this.props.selectOptionFields).map(this.renderSelectOptionHeader)}
					</ul>
				</div>
				{this.sortSelectOptions(this.props.property.selectOptions)}
			</div>
		)
	}
})

export default PropertySelectTypeList;