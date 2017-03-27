import React from 'react';
import PropertySelectType from './PropertySelectType';

const PropertySelectTypeList = React.createClass({
	
	renderSelectOptionField(key){
		return <PropertySelectType details={this.props.property.selectOptions[key[0]]} propertyKey={this.props.propertyKey} key={key[0]} index={key[0]} />
	},

	renderSelectOptionHeader(key){
		return <li key={key}>{key}</li>
	},

	render(){
		var selectOptionsOrderArray = [];
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						<li>Name</li>
						<li>Order</li>
					</ul>
				</div>
				{this.props.sortSelectOptions(selectOptionsOrderArray,this.props.propertyKey)}
				{selectOptionsOrderArray.map(this.renderSelectOptionField)}
			</div>
		)
	}
})

export default PropertySelectTypeList;