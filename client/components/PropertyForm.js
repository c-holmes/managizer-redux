import React from 'react';

class PropertyForm extends React.Component {
	createNewPropertyObj(event) {
		event.preventDefault();
		var newPropertyFields = {};

		//populate new property fields obj
		Object.keys(this.props.propertyFields).map(function(key){
			newPropertyFields[key] = this.refs[key].value;
		}.bind( this ))

		//call obj to reducer
		this.props.addProperty(newPropertyFields, this.props.account._id);

		//reset form
		this.refs.propertyForm.reset();
	}

	renderOptions(key){
		return(
			<option key={key} value={key} >{key}</option>
		)
	}

	render() {
		return(
			<div className="sect">
				<h3>Add a Property</h3>
				<form className="type1" ref="propertyForm" onSubmit={this.createNewPropertyObj.bind(this)}>
					<div className="input-holder">
						<input type="text" ref="name" placeholder="Name of Field" />
					</div>
					<div className="input-holder">
						<select ref="type">
							{this.props.propertyFields.type.map(this.renderOptions.bind(this))}
						</select>
					</div>
					<div className="input-holder">
						<input type="text" ref="placeholder" placeholder="Field Placeholder"/>
					</div>
					<div className="input-holder">
						<input type="number" ref="order" placeholder="Order"/>
					</div>
					<div className="submit-holder">
						<button type="submit">Submit </button>
					</div>
				</form>
			</div>	
		)
	}
}

export default PropertyForm;