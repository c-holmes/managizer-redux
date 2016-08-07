import React from 'react';

const ProjectHeader = React.createClass({
	render(){
		if(this.props.details !== null){
			return (
				<li>{this.props.details.name}</li>
			)
		} else {
			return ( null )
		}
	}
});

export default ProjectHeader;