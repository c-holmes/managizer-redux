import React from 'react';
import ProjectHeader from './ProjectHeader';
import Project from './Project';
//import autobind from 'autobind-decorator';

const ProjectPanel = React.createClass({

	renderProjectHeader(key) { 
		return <ProjectHeader key={key} index={key} details={this.props.properties[key]} />
	},

	renderProject(key) {
		return <Project key={key} index={key} details={this.props.projects[key]} properties={this.props.properties} editProject={this.props.editProject} deleteProject={this.props.deleteProject}/>
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

	render(){
		var propertyOrderArray = [];
		var propertyOrderObject = {};
		return(
			<div className="sect project-panel">
				<h2>Project Panel</h2>
				<div className="grid-list">
					<div className="head-group">
						<ul className="head">
							<li className="options-head"></li>
							{this.sortProjectProperties(propertyOrderArray, propertyOrderObject)}		
							{Object.keys(propertyOrderObject).map(this.renderProjectHeader)}
						</ul>
					</div>
					{Object.keys(this.props.projects).map(this.renderProject)}
				</div>
			</div>
		)
	}
})

export default ProjectPanel;