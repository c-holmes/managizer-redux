import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import PropertySelectTypeGroup from './PropertySelectTypeGroup';
import ProjectForm from './ProjectForm';

//auto add order
//add icon set
//update other sort options to sort and render out same as select Option (use obj instead of array)
//make columns draggable
	//http://react-dnd.github.io/react-dnd/examples-sortable-simple.html
//create admin toolbar
	//filter buttons on the left
		//Show all
		//Add Project
		//Show Statuses
	//acount settings on the left
	//full width
	//analytics
		//per property (ie sites in PRJDEV)
//edit styling
	//hide duplication (grey out the other stuff)
//Active Project, Complete Project List, TBD Project List
//ES6 itize

//download before trip
	//icon set
	//react dnd

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