import React from 'react';
import PropertySelectTypeList from './PropertySelectTypeList';
import PropertySelectTypeForm from './PropertySelectTypeForm';

const PropertySelectTypeGroup = React.createClass({

	sortSelectOptions(selectOptionOrderArray,propertyKey){
		console.log(this.props.properties[propertyKey].selectOptions);
		//iterate through properties
		Object.keys(this.props.properties[propertyKey].selectOptions).map(function(key){
			if(this.props.properties[propertyKey].selectOptions !== null){
				//push name & order to array
				selectOptionOrderArray.push([key, this.props.properties[propertyKey].selectOptions.order])
			}
		}, this)

		//sort array by order
		selectOptionOrderArray.sort(function(a,b){
			return a[1] - b[1]
		});
	},

	render(){
		return(
			<div  className="sect split cf">
				<div className="left">
					<h3>Add a {this.props.properties[this.props.index].name}</h3>
					<PropertySelectTypeForm properties={this.props.properties} index={this.props.index} account={this.props.account} addSelectOption={this.props.addSelectOption}/>
				</div>
				<div className="right">
					<h3>{this.props.properties[this.props.index].name} List</h3>
					<PropertySelectTypeList property={this.props.properties[this.props.index]} propertyKey={this.props.index} sortSelectOptions={this.sortSelectOptions} />
				</div>
			</div>
		) 
	}
})

export default PropertySelectTypeGroup;