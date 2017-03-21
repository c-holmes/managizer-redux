import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import PropertySelectTypeForm from './PropertySelectTypeForm';
import ProjectForm from './ProjectForm';

const AdminPanel = React.createClass({
	render() {
		return(
			<div className="sect admin-panel">
				<ul className="toolbar">
					<li>
						<button className="open" onClick={this.props.togglePanel}>Open</button>
						<button className="close" onClick={this.props.togglePanel}>Close</button>
					</li>
				</ul>
				<div className="properties container">
					<PropertyList {...this.props} />
					<PropertyForm {...this.props} />
					<PropertySelectTypeForm {...this.props} />
					<ProjectForm {...this.props} />
				</div>
			</div>
		)
	}
})

export default AdminPanel;