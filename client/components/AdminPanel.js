import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import ProjectForm from './ProjectForm';

const AdminPanel = React.createClass({
	render() {
		return(
			<div className="sect admin-panel">
				<h2>Admin Panel</h2>
				<PropertyList {...this.props} />
				<PropertyForm {...this.props} />
				<ProjectForm {...this.props} />
			</div>
		)
	}
})

export default AdminPanel;