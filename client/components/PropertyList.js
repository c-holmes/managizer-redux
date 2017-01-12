import React from 'react';
import Property from './Property';

const PropertyList = React.createClass({

	renderPropertyField(key) {
		return <Property key={key} index={key} details={this.props.properties[key]} properties={this.props.propertyFields} editProperty={this.props.editProperty} deleteProperty={this.props.deleteProperty} saveProperty={this.props.saveProperty} />
	},

	renderPropertyHeader(key){
		return <li key={key}>{key}</li>
	},

	render() {
		var propertyOrderArray = [];
		var propertyOrderObject = {};
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						{Object.keys(this.props.propertyFields).map(this.renderPropertyHeader)}
					</ul>
				</div>
				{this.props.sortProjectProperties(propertyOrderArray, propertyOrderObject)}
				{Object.keys(propertyOrderObject).map(this.renderPropertyField)}
			</div>
		)
	}
})

export default PropertyList;