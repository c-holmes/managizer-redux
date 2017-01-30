import React from 'react';
import ProjectHeader from './ProjectHeader';
import Project from './Project';

const ProjectList = React.createClass ({

	renderProjectHeader(key) { 
		return <ProjectHeader key={key[0]} index={key[0]} details={this.props.properties[key[0]]} />
	},

	renderProject(key) {
		return <Project key={key} index={key} accountId={this.props.account._id} details={this.props.projects[key]} properties={this.props.properties} editProject={this.props.editProject} deleteProject={this.props.deleteProject} saveProject={this.props.saveProject} />
	},

	render(){
		var propertyOrderArray = [];
		return(
			<div className="grid-list">
				<div className="head-group">
					<ul className="head">
						<li className="options-head"></li>
						{this.props.sortProjectProperties(propertyOrderArray)}		
						{propertyOrderArray.map(this.renderProjectHeader)}
					</ul>
				</div>
				{Object.keys(this.props.projects).map(this.renderProject)}
			</div>
		)
	}
})

export default ProjectList;