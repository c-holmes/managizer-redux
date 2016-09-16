import React from 'react';
import ProjectList from './ProjectList';

const ProjectPanel = React.createClass({
	render(){
		return(
			<div className="sect project-panel">
				<h2>Project Panel</h2>
				<ProjectList {...this.props}  />
			</div>
		)
	}
})

export default ProjectPanel;