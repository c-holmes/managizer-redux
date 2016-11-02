import React from 'react';
import classNames from 'classnames/bind';

const Project = React.createClass({
	getInitialState () {
		return { isPressed : false };
	},

	toggleButton(event){
		event.preventDefault();
		if(this.state.isPressed == true){
			this.state.isPressed = false;
		} else {
			this.state.isPressed = true;
		}
		this.setState({
			isPressed : this.state.isPressed
		})
	},

	sortProjectProperties(propertyOrderArray, propertyOrderObject){
		//iterate through properties
		Object.keys(this.props.properties).map(function(key){
			if(this.props.properties[key] !== null){
				//push name & order to array
				propertyOrderArray.push([key, this.props.properties[key].order])
				//sort array by order
				propertyOrderArray.sort(function(a,b){
					return a[1] - b[1]
				});
			}
		}, this)

		//push sorted array values to obj
		for(var i = 0; i < propertyOrderArray.length; i++){
			propertyOrderObject[propertyOrderArray[i][0]] = propertyOrderArray[i][1]							
		}
	},

	renderProjectField(key){
		//set sorted property slug
		var propertyValue = this.props.properties[key].slug;

		//output project's property based on sort order
		return(
			<li className="cell" key={key}>{this.props.details[propertyValue]}</li>
		)
	},

	renderEditField(key){
		//set the edited property slug to variable (variable to be passed to editProject func)
		var propertyValue = this.props.properties[key].slug;
		//set the edited project to variable (variable to be passed to editProject func)
		var projectValue = this.props.index;
		var projectId = this.props.details._id;

		return(
			<span key={key} className="cell">
				<input type="text" value={this.props.details[propertyValue]} onChange={this.props.editProject.bind(this, projectValue, propertyValue, projectId)} />
			</span>
		)
	},

	saveProjectObj(event){
		console.log('project saved');
		event.preventDefault();
		var editedProjectProperties = {};

		//create array of all property slugs
		var propertyArray = Object.keys(this.props.properties).map(function(key){
			if(this.props.properties[key].slug !== null) {
				return this.props.properties[key].slug;
			}
		}.bind( this ));

		//strip unwanted form refs from form data
		var projectFormVals = [];
		var stripValue = ["submit"];
		for( var i = 0; i < this.refs.projectForm.length; i++ ){
			if(stripValue.indexOf(this.refs.projectForm[i].type) > -1){
				//do nothing
			} else {
				projectFormVals.push(this.refs.projectForm[i].value);
			}
		}

		//use array to populate new project properties obj
		for( var i = 0; i < propertyArray.length; i++){
			editedProjectProperties[propertyArray[i]] = projectFormVals[i];
		}

		//pass obj to reducer
		console.log(editedProjectProperties);

		//TODO:(NEXT)update actionCreator & create reducer for Saving Edited Project To DB

		//this.props.addProject(newProjectProperties);
		this.toggleButton(event);
	},

	render(){
		var propertyOrderArray = [];
		var propertyOrderObject = {};
		var btnClass = classNames({
			'item':true,
			'hide':true,
		  	'btn-pressed': this.state.isPressed
		});
		var editMode = classNames({
			'options-block':true,
		  	'edit-active': this.state.isPressed
		});

		if(this.props.details !== null){
			return(
				<div className="item-group">
					<ul className="item">
						<li className={editMode}>
							<button onClick={this.props.deleteProject.bind(null, this.props.index, this.props.details._id)} className="delete" ref="delete">Delete</button>
							<button className="edit-btn" onClick={this.toggleButton}>Edit</button>
							<button className="back-btn" onClick={this.toggleButton}>Back</button>
						</li>
						{this.sortProjectProperties(propertyOrderArray,propertyOrderObject)}
						{Object.keys(propertyOrderObject).map(this.renderProjectField)}
					</ul>
					<form ref="projectForm" className={btnClass} onSubmit={this.saveProjectObj}>
						<span className="cell">
							<button type="submit" className="save-btn">Save</button>
						</span>
						{Object.keys(propertyOrderObject).map(this.renderEditField)}
					</form>
				</div>	
			)
		} else {
			return (null)
		}
	}
});

export default Project;