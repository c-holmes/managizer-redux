import React from 'react';
import Property from './Property';

class PropertyList extends React.Component{

	renderPropertyField(key) {
		return <Property key={key[0]} index={key[0]} details={this.props.properties[key[0]]} properties={this.props.propertyFields} accountId={this.props.account._id} editProperty={this.props.editProperty} deleteProperty={this.props.deleteProperty} saveProperty={this.props.saveProperty} />
	}

	renderPropertyHeader(key){
		return <li key={key}>{key}</li>
	}

	render() {
		var propertyOrderArray = [];
		return(
			<div className="sect">
				<div className="grid-list">
					<div className="head-group">
						<ul className="head">
							<li className="options-head"></li>
							{Object.keys(this.props.propertyFields).map(this.renderPropertyHeader.bind(this))}
						</ul>
					</div>
					{this.props.sortProjectProperties(propertyOrderArray)}
					{propertyOrderArray.map(this.renderPropertyField.bind(this))}
				</div>
			</div>
		)
	}
}

export default PropertyList;