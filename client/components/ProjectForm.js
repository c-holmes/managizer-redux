import React from 'react';
import PropertyDateType from './PropertyDateType';

const ProjectForm = React.createClass({
	sortSelectOptions(selectOptionsOrderArray,selectOptionArray){
		selectOptionArray.map(function(selectOption,key){
			if(selectOption !== null){
				//original key, order, name
				selectOptionsOrderArray.push([key,selectOption.order,selectOption.name]);
			}
		}, this)

		//sort array by order
		selectOptionsOrderArray.sort(function(a,b){
			return a[1] - b[1]
		});
	},

	renderField(key) {
		if(this.props.properties[key] !== null ){
			if(this.props.properties[key].type == 'select'){
				var selectOptionsOrderArray = [];
				return(
					<div key={key} className="input-holder">
						<select ref={this.props.properties[key].slug}>
							{this.sortSelectOptions(selectOptionsOrderArray,this.props.properties[key].selectOptions)}
							{selectOptionsOrderArray.map(this.renderOptions)}
						</select>
					</div>
				)
			} else if(this.props.properties[key].type == 'date'){
				return(
					<div key={key} className="input-holder">
						<PropertyDateType />
					</div>
				)
			}else {
				return(
					<div key={key} className="input-holder">
						<input key={key} type={this.props.properties[key].type} ref={this.props.properties[key].slug} placeholder={this.props.properties[key].placeholder}  />			
					</div>
				)
			}
		} else {
			return null
		}
	},

	renderOptions(option){
		return(
			<option key={option[1]} value={option[2]} >{option[2]}</option>
		)
	},

	createNewProjectObj(event) {
		event.preventDefault();
		var newProjectProperties = {};
		var accountId = this.props.account._id;

		//create array of all property slugs
		var propertyArray = Object.keys(this.props.properties).map(function(key){
			console.log(key);
			if(this.props.properties[key].slug !== null) {
				return this.props.properties[key].slug;
			}
		}.bind( this ));

		//use array to populate new project properties obj
		for( var i = 0; i < propertyArray.length; i++){
			newProjectProperties[propertyArray[i]] = this.refs.projectForm[i].value
		}

		//pass obj to reducer
		this.props.addProject(newProjectProperties,accountId);

		//reset form
		this.refs.projectForm.reset();
	},

	render(){
		return(
			<div className="sect">
				<h3>Add a Project</h3>
				<form className="type1" ref="projectForm" onSubmit={this.createNewProjectObj} >
					{Object.keys(this.props.properties).map(this.renderField)}
					<div className="submit-holder">
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		)
	}
})

export default ProjectForm;