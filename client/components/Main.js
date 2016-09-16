import React from 'react';
import ProjectPanel from './ProjectPanel';
import AdminPanel from './AdminPanel';

const Main = React.createClass({
	sortProjectProperties(propertyOrderArray, propertyOrderObject){
		//iterate through properties
		Object.keys(this.props.properties).map(function(key){
			if(this.props.properties[key] !== null){
				//push name & order to array
				propertyOrderArray.push([key, this.props.properties[key].order])
				//sort array by order
				propertyOrderArray.sort(function(a,b){
					return a[1] - b[1]
				});
			}
		}, this)

		//push sorted array values to obj
		for(var i = 0; i < propertyOrderArray.length; i++){
			propertyOrderObject[propertyOrderArray[i][0]] = propertyOrderArray[i][1]							
		}
	},
	
	render() {
		return (
			<div className="app">
				<ProjectPanel {...this.props} sortProjectProperties={this.sortProjectProperties} />
				<AdminPanel {...this.props} sortProjectProperties={this.sortProjectProperties} />
			</div>
		)
	}
})

export default Main;