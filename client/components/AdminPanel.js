import React from 'react';
import PropertyList from './PropertyList';

const AdminPanel = React.createClass({
	render() {
		return(
			<div className="sect admin-panel">
				<h2>Admin Panel</h2>
				<PropertyList {...this.props} />
			</div>
		)
	}
})

export default AdminPanel;