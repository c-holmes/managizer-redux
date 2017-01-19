import React from 'react';
import Property from './Property';

const PropertyList = React.createClass({

	renderPropertyField(key) {
		return <Property key={key[0]} index={key[0]} details={this.props.properties[key[0]]} properties={this.props.propertyFields} editProperty={this.props.editProperty} deleteProperty={this.props.deleteProperty} saveProperty={this.props.saveProperty} />
	},

	renderPropertyHeader(key){
		return <li key={key}>{key}</li>
	},

	test(key){
		console.log(key[1]);
		return <p>hello</p>
	},

	render() {
		var propertyOrderArray = [];
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						{Object.keys(this.props.propertyFields).map(this.renderPropertyHeader)}
					</ul>
				</div>
				{this.props.sortProjectProperties(propertyOrderArray)}
				{propertyOrderArray.map(this.renderPropertyField)}
			</div>
		)
	}
})

export default PropertyList;