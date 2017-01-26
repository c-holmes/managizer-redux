import React from 'react';
import ProjectList from './ProjectList';

const ProjectPanel = React.createClass({
	render(){
		// create a lookup object
		var lookup = {};
		for (var i = 0, len = this.props.accounts.length; i < len; i++) {
		    lookup[this.props.accounts[i].name] = this.props.accounts[i];
		}
		console.log(lookup);
		//
		return(
			<div className="sect project-panel">
				<h2>Project Panel</h2>
				<ProjectList {...this.props}  />
			</div>
		)
	}
})

export default ProjectPanel;