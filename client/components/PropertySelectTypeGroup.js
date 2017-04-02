import React from 'react';
import PropertySelectTypeList from './PropertySelectTypeList';
import PropertySelectTypeForm from './PropertySelectTypeForm';

const PropertySelectTypeGroup = React.createClass({
	render(){
		return(
			<div  className="sect split cf">
				<div className="left">
					<h3>Add a {this.props.properties[this.props.index].name}</h3>
					<PropertySelectTypeForm properties={this.props.properties} index={this.props.index} account={this.props.account} addSelectOption={this.props.addSelectOption}/>
				</div>
				<div className="right">
					<h3>{this.props.properties[this.props.index].name} List</h3>
					<PropertySelectTypeList property={this.props.properties[this.props.index]} propertyKey={this.props.index} properties={this.props.properties} selectOptionFields={this.props.selectOptionFields}/>
				</div>
			</div>
		) 
	}
})

export default PropertySelectTypeGroup;