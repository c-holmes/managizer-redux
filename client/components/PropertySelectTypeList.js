import React from 'react';
import PropertySelectType from './PropertySelectType';

const PropertySelectTypeList = React.createClass({
	
	renderSelectOptionField(key){
		return <PropertySelectType details={this.props.property.selectOptions[key[0]]} selectOptionFields={this.props.selectOptionFields} key={key[0]} />
	},

	renderSelectOptionHeader(key){
		return <li key={key}>{key}</li>
	},

	sortSelectOptions(selectOptionsOrderArray,selectOptionArray){
		selectOptionArray.map(function(selectOption,key){
			if(key !== null){
				//original key, order, name
				selectOptionsOrderArray.push([key,selectOption.order,selectOption.name]);
			}
		}, this)

		//sort array by order
		selectOptionsOrderArray.sort(function(a,b){
			return a[1] - b[1]
		});
	},

	render(){
		var selectOptionsOrderArray = [];
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						{Object.keys(this.props.selectOptionFields).map(this.renderSelectOptionHeader)}
					</ul>
				</div>
				{this.sortSelectOptions(selectOptionsOrderArray,this.props.property.selectOptions)}
				{selectOptionsOrderArray.map(this.renderSelectOptionField)}
			</div>
		)
	}
})

export default PropertySelectTypeList;