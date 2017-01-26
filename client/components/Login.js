import React from 'react';
import { browserHistory } from 'react-router'


const Login = React.createClass({
	createAccount(event){
		event.preventDefault();
		var newAccountFields = {};

		function slugify(name){
			var slug = name;
			//replace1 removes special chars, replace2 removes front and back "-", todo understand regex
			slug = slug.replace(/[^a-zA-Z0-9]+/ig, "-").replace(/^-+|-+$/g,'').toLowerCase();
			return slug; 
		}

		const accountSlug = slugify(this.refs.name.value);

		Object.keys(this.props.accountFields).map(function(key){
			newAccountFields[key] = this.refs[key].value;
		}.bind( this ))

		this.props.createAccount(newAccountFields);

		const path = `/account/${accountSlug}`
		browserHistory.push(path)

	},

	loginAccount(event){
		event.preventDefault();

		function slugify(name){
			var slug = name;
			//replace1 removes special chars, replace2 removes front and back "-", todo understand regex
			slug = slug.replace(/[^a-zA-Z0-9]+/ig, "-").replace(/^-+|-+$/g,'').toLowerCase();
			return slug; 
		}

		const accountSlug = slugify(this.refs.name.value);

		//this.props.loginAccount(accountSlug);
		this.props.fetchData('projects');
		this.props.fetchData('properties');

		const path = `/account/${accountSlug}`;
		browserHistory.push(path)
	},

	render() {
		return(
			<div className="user-panel">
				<h2>Create New Account</h2>
				<form ref="accountForm" className="login-panel" onSubmit={this.createAccount} >
					<input type="text" ref="name" placeholder="Enter Account Name" />
					<input type="text" ref="user" placeholder="Enter User Name" />
					<button type="submit">Submit</button>
				</form>
				<h2>Login</h2>
				<form ref="loginForm" className="login-panel" onSubmit={this.loginAccount} >
					<input type="text" ref="login-name" placeholder="Enter Account Name" />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

export default Login;