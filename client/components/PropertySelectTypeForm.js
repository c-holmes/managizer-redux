import React from 'react';

const PropertySelectTypeForm = React.createClass({
	addToSelectOptions(event){
		event.preventDefault();
		var newOption = this.refs.name.value;
		var accountId = this.props.account._id;
		var propertyObj = {
			'id' : this.refs.propertyId.value,
			'slug' : this.refs.formSlug.value,
			'key': this.refs.propertyKey.value
		}
		this.props.addSelectOption(newOption,propertyObj,accountId);
		this.refs[propertyObj.slug].reset();
	},

	renderForms(key){
		if(this.props.properties[key] !== null){
			if(this.props.properties[key].type == 'select'){
				var formName = 'selectAddForm' + key;
				return(
					<div key={key} className="sect">
						<h3>Add a {this.props.properties[key].name}</h3>
						<form className="type1" ref={this.props.properties[key].slug} onSubmit={this.addToSelectOptions}>
							<div className="input-holder">
								<input type="text" ref="name" placeholder="Name of Field" />
								<input type="hidden" value={key} ref="propertyKey" />
								<input type="hidden" value={this.props.properties[key]._id} ref="propertyId" />
								<input type="hidden" value={this.props.properties[key].slug} ref="formSlug"  />
							</div>
							<div className="submit-holder">
								<button type="submit">Submit</button>
							</div>
						</form>
					</div>
				)
			}
		}
	},

	render(){
		return(
			<div className="sect">
				{Object.keys(this.props.properties).map(this.renderForms)}
			</div>
		) 
	}
}) 

export default PropertySelectTypeForm;