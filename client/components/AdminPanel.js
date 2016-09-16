import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';

const AdminPanel = React.createClass({
	render() {
		return(
			<div className="sect admin-panel">
				<h2>Admin Panel</h2>
				<PropertyList {...this.props} />
				<PropertyForm {...this.props} />
			</div>
		)
	}
})

export default AdminPanel;