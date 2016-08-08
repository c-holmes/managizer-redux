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

		return(
			<span key={key} className="cell">
				<input type="text" value={this.props.details[propertyValue]} onChange={this.props.editProject.bind(this, projectValue, propertyValue)} />
			</span>
		)
	},

	render(){
		var propertyOrderArray = [];
		var propertyOrderObject = {};
		var btnClass = classNames({
			'item':true,
			'hide':true,
		  	'btn-pressed': this.state.isPressed
		});

		if(this.props.details !== null){
			return(
				<div className="item-group">
					<ul className="item">
						<li className="options-block">
							<ul>
								<button onClick={this.props.deleteProject.bind(null, this.props.index)} className="delete" ref="delete">Delete</button>
								<button onClick={this.toggleButton}>Edit</button>
							</ul>
						</li>
						{this.sortProjectProperties(propertyOrderArray,propertyOrderObject)}
						{Object.keys(propertyOrderObject).map(this.renderProjectField)}
					</ul>
					<form className={btnClass}>
						<span className="cell"></span>
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