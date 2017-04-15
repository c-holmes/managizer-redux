import React from 'react';
import ProjectList from './ProjectList';

const ProjectPanel = React.createClass({
	render(){
		// create a lookup object
		var lookup = {};
		for (var i = 0, len = this.props.accounts.length; i < len; i++) {
		    lookup[this.props.accounts[i].name] = this.props.accounts[i];
		}

		return(
			<div className="sect project-panel">
				<div className="container">
					<ProjectList {...this.props}  />
				</div>
			</div>
		)
	}
})

export default ProjectPanel;