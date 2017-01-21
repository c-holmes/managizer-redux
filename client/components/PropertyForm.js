import React from 'react';

const PropertyForm = React.createClass({
	createNewPropertyObj(event) {
		event.preventDefault();
		var newPropertyFields = {};

		//populate new property fields obj
		console.log(this.props.propertyFields);
		Object.keys(this.props.propertyFields).map(function(key){
			newPropertyFields[key] = this.refs[key].value;
		}.bind( this ))

		//call obj to reducer
		this.props.addProperty(newPropertyFields);

		//reset form
		this.refs.propertyForm.reset();
	},

	render() {
		return(
			<div>
				<h3>Add a Property</h3>
				<form ref="propertyForm" onSubmit={this.createNewPropertyObj}>
					<input type="text" ref="name" placeholder="Name of Field" />
					<input type="text" ref="type" placeholder="Type of Field" />
					<input type="text" ref="placeholder" placeholder="Field Placeholder"/>
					<input type="number" ref="order" placeholder="Order"/>
					<button type="submit">Submit </button>
				</form>
			</div>	
		)
	}
})

export default PropertyForm;