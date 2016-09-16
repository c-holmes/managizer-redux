import React from 'react';

const PropertyForm = React.createClass({
	createProperty(event) {
		event.preventDefault();
		var propertyFieldArray = {};

		//Assign value to propertyFieldArray
		Object.keys(this.props.propertyFields).map(function(key){
			propertyFieldArray[key] = this.refs[key].value;
		}.bind( this ))

		//call property reducer
		this.props.addProperty(propertyFieldArray);

		//call project reducer

		//reset form
		this.refs.propertyForm.reset();
	},

	render() {
		return(
			<div>
				<h3>Add a Property</h3>
				<form ref="propertyForm" onSubmit={this.createProperty}>
					<input type="text" ref="name" placeholder="Name of Field" />
					<input type="text" ref="slug" placeholder="Unique Name of Field" />
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