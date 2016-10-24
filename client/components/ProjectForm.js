import React from 'react';

const ProjectForm = React.createClass({
	renderField(key) {
		if(this.props.properties !== null ){
			return <input className="test" key={key} type={this.props.properties[key].type} ref={this.props.properties[key].slug} placeholder={this.props.properties[key].placeholder}  />			
		} else {
			return null
		}
	},

	createNewProjectObj(event) {
		event.preventDefault();
		var newProjectProperties = {};

		//create array of all property slugs
		var propertyArray = Object.keys(this.props.properties).map(function(key){
			if(this.props.properties[key].slug !== null) {
				return this.props.properties[key].slug;
			}
		}.bind( this ));

		//use array to populate new project properties obj
		for( var i = 0; i < propertyArray.length; i++){
			newProjectProperties[propertyArray[i]] = this.refs.projectForm[i].value
		}

		//pass obj to reducer
		// this.props.addProject(newProjectProperties);
		this.props.postData('projects',newProjectProperties );

		//reset form
		this.refs.projectForm.reset();
	},

	render(){
		return(
			<div>
				<h3>Add a Project</h3>
				<form ref="projectForm" onSubmit={this.createNewProjectObj} >
					{Object.keys(this.props.properties).map(this.renderField)}
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

export default ProjectForm;