import React from 'react';
import ProjectHeader from './ProjectHeader';
import Project from './Project';

const ProjectList = React.createClass ({

	renderProjectHeader(key) { 
		return <ProjectHeader key={key} index={key} details={this.props.properties[key]} />
	},

	renderProject(key) {
		return <Project key={key} index={key} details={this.props.projects[key]} properties={this.props.properties} editProject={this.props.editProject} deleteProject={this.props.deleteProject} saveProject={this.props.saveProject} />
	},

	render(){
		var propertyOrderArray = [];
		var propertyOrderObject = {};
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						{this.props.sortProjectProperties(propertyOrderArray, propertyOrderObject)}		
						{Object.keys(propertyOrderObject).map(this.renderProjectHeader)}
					</ul>
				</div>
				{Object.keys(this.props.projects).map(this.renderProject)}
			</div>
		)
	}
})

export default ProjectList;