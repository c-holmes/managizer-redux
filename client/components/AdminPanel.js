import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import PropertySelectTypeGroup from './PropertySelectTypeGroup';
import ProjectForm from './ProjectForm';

//Update Serilization Function so that it can serilize nested arrays of objs
//add edit/delete to select options
// -> Add _id to select Option so we can delete
//auto add order
//add react date picker
// -> https://hacker0x01.github.io/react-datepicker/
//add icon set
//update other sort options to sort and render out same as select Option (use obj instead of array)

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