import React from 'react';
import PropertySelectTypeList from './PropertySelectTypeList';

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

	sortSelectOptions(selectOptionOrderArray,propertyKey){
		console.log(this.props.properties[propertyKey].selectOptions);
		//iterate through properties
		Object.keys(this.props.properties[propertyKey].selectOptions).map(function(key){
			if(this.props.properties[propertyKey].selectOptions !== null){
				//push name & order to array
				selectOptionOrderArray.push([key, this.props.properties[propertyKey].selectOptions.order])
			}
		}, this)

		//sort array by order
		selectOptionOrderArray.sort(function(a,b){
			return a[1] - b[1]
		});
	},

	render(){
		var formName = 'selectAddForm' + this.props.index;
		return(
			<div  className="sect split cf">
				<div className="left">
					<h3>Add a {this.props.properties[this.props.index].name}</h3>
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
				</div>
				<div className="right">
					<h3>{this.props.properties[this.props.index].name} List</h3>
					<PropertySelectTypeList property={this.props.properties[this.props.index]} propertyKey={this.props.index} sortSelectOptions={this.sortSelectOptions} />
				</div>
			</div>
		) 
	}
}) 

export default PropertySelectTypeForm;