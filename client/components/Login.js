import React from 'react';
import { browserHistory } from 'react-router'


const Login = React.createClass({
	createAccount(event){
		event.preventDefault();

		const accountId = this.refs.name.value;
		var newAccountFields = {};

		Object.keys(this.props.accountFields).map(function(key){
			newAccountFields[key] = this.refs[key].value;
		}.bind( this ))

		this.props.createAccount(newAccountFields);

		const path = `/account/${accountId}`
		browserHistory.push(path)

	},

	render() {
		return(
			<form ref="accountForm" className="login-panel" onSubmit={this.createAccount} >
				<input type="text" ref="name" placeholder="Enter Account Name" />
				<input type="text" ref="user" placeholder="Enter User Name" />
				<button type="submit">Submit</button>
			</form>
		)
	}
})

export default Login;