import React from 'react';
import ProjectPanel from './ProjectPanel';
import AdminPanel from './AdminPanel';

const Main = React.createClass({
	render() {
		return (
			<div className="app">
				<ProjectPanel />
				<AdminPanel />
			</div>
		)
	}
})

export default Main;