import React from 'react';
import ProjectPanel from './ProjectPanel';
import AdminPanel from './AdminPanel';

const Main = React.createClass({
	sortProjectProperties(propertyOrderArray){
		//iterate through properties
		Object.keys(this.props.properties).map(function(key){
			if(this.props.properties[key] !== null){
				//push name & order to array
				propertyOrderArray.push([key, this.props.properties[key].order])
			}
		}, this)

		//sort array by order
		propertyOrderArray.sort(function(a,b){
			return a[1] - b[1]
		});
	},

	loadStateFromStorage(){
		var url = window.location.pathname;
		var accountSlug = url.replace('/account/', '');

		if(this.props.account.length == 0){
			console.log('empty');
			//Browser Local Storage
			if (typeof(Storage) !== "undefined") {
				var localData = JSON.parse(localStorage.getItem(accountSlug));
				if('accountId' in localData && localData.accountId !== undefined ){
					this.props.fetchAccountData('account', localData.accountId);
					this.props.fetchAccountData('projects', localData.accountId);
					this.props.fetchAccountData('properties', localData.accountId);
				}
			} else {
			    console.log('Sorry! No Web Storage support..');
			}
		}
	},

	render() {
		return (
			<div className="app">
				{this.loadStateFromStorage()}
				<ProjectPanel {...this.props} sortProjectProperties={this.sortProjectProperties} />
				<AdminPanel {...this.props} sortProjectProperties={this.sortProjectProperties} />
			</div>
		)
	}
})

export default Main;