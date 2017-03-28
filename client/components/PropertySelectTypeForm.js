import React from 'react';

const PropertySelectTypeForm = React.createClass({

	addToSelectOptions(event){
		event.preventDefault();
		var newOptionObj = {
			name:this.refs.name.value,
			order:this.refs.order.value
		};

		var accountId = this.props.account._id;
		var propertyKey = this.props.index;
		var propertyId = this.props.properties[propertyKey]._id;

		this.props.addSelectOption(propertyKey,propertyId,newOptionObj,accountId);
		this.refs[this.props.properties[propertyKey].slug].reset();
	},
	
	render(){
		return(
			<form className="type1" ref={this.props.properties[this.props.index].slug} onSubmit={this.addToSelectOptions}>
				<div className="input-holder num-sml-side">
					<input type="text" ref="name" placeholder="Name of Field" />
					<input type="number" ref="order" placeholder="Order" />
					<input type="hidden" value={this.props.index} ref="propertyKey" />
				</div>
				<div className="submit-holder">
					<button type="submit">Submit</button>
				</div>
			</form>
		)
	}
}) 

export default PropertySelectTypeForm;