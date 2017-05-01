import React from 'react';

class ProjectHeader extends React.Component {
	render(){
		if(this.props.details !== null){
			return (
				<li>{this.props.details.name}</li>
			)
		} else {
			return ( null )
		}
	}
}

export default ProjectHeader;