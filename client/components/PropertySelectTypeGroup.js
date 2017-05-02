import React from 'react';
import PropertySelectTypeList from './PropertySelectTypeList';
import PropertySelectTypeForm from './PropertySelectTypeForm';

class PropertySelectTypeGroup extends React.Component{
	render(){
		return(
			<div  className="sect split cf">
				<div className="left">
					<h3>Add a {this.props.properties[this.props.index].name}</h3>
					<PropertySelectTypeForm property={this.props.properties[this.props.index]} index={this.props.index} accountId={this.props.account._id} addSelectOption={this.props.addSelectOption}/>
				</div>
				<div className="right">
					<h3>{this.props.properties[this.props.index].name} List</h3>
					<PropertySelectTypeList property={this.props.properties[this.props.index]} propertyIndex={this.props.index} accountId={this.props.account._id} selectOptionFields={this.props.selectOptionFields} editSelectOption={this.props.editSelectOption} saveSelectOption={this.props.saveSelectOption} deleteSelectOption={this.props.deleteSelectOption}/>
				</div>
			</div>
		) 
	}
}

export default PropertySelectTypeGroup;