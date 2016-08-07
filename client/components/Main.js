import React from 'react';
import ProjectPanel from './ProjectPanel';
import AdminPanel from './AdminPanel';

const Main = React.createClass({
	render() {
		return (
			<div className="app">
				<ProjectPanel {...this.props} />
				<AdminPanel {...this.props} />
			</div>
		)
	}
})

export default Main;