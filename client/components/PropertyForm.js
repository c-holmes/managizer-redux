import React from 'react';

const PropertyForm = React.createClass({
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
	},

	render() {
		return(
			<div className="sect">
				<h3>Add a Property</h3>
				<form className="type1" ref="propertyForm" onSubmit={this.createNewPropertyObj}>
					<div className="input-holder">
						<input type="text" ref="name" placeholder="Name of Field" />
					</div>
					<div className="input-holder">
						<input type="text" ref="type" placeholder="Type of Field" />
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
})

export default PropertyForm;