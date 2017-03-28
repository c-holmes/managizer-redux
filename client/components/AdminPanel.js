import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import PropertySelectTypeGroup from './PropertySelectTypeGroup';
import ProjectForm from './ProjectForm';

//move Sort Option Objects into SelectOptions List
//get selectOption header's rendering correctly - pull in headers dynamically
//add edit/delete to select options

const AdminPanel = React.createClass({
	renderSelectOptionGroups(key){
		if(this.props.properties[key] !== null){
			if(this.props.properties[key].type == 'select'){
				return <PropertySelectTypeGroup key={key} index={key} {...this.props} />
			}
		}
	},

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
					{Object.keys(this.props.properties).map(this.renderSelectOptionGroups)}
					<ProjectForm {...this.props} />
				</div>
			</div>
		)
	}
})

export default AdminPanel;