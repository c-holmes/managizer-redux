import React from 'react';
import { browserHistory } from 'react-router'


const Login = React.createClass({
	createAccount(event){
		event.preventDefault();
		var newAccountFields = {};
		var timestamp = (new Date()).getTime();

		function slugify(name){
			var slug = name;
			//replace1 removes special chars, replace2 removes front and back "-", todo understand regex
			slug = slug.replace(/[^a-zA-Z0-9]+/ig, "-").replace(/^-+|-+$/g,'').toLowerCase();
			return slug; 
		}

		newAccountFields['_id'] = timestamp.toString();
		newAccountFields['slug'] = slugify(this.refs.name.value);;
		newAccountFields['projects'] = [];
		newAccountFields['properties'] = [];

		Object.keys(this.props.accountFields).map(function(key){
			newAccountFields[key] = this.refs[key].value;
		}.bind( this ))

		this.props.createAccount(newAccountFields);

		const path = `/account/${newAccountFields['slug']}`
		browserHistory.push(path)

	},

	loginAccount(event){
		event.preventDefault();
		const loginEmail = this.refs.loginEmail.value;
		const accountsArray = this.props.accounts;

		//find account based off email provided
		var currAccount = accountsArray.filter(function(obj){
			return obj.email == loginEmail;
		});

		this.props.fetchAccountData('account', currAccount[0]._id);
		this.props.fetchAccountData('projects', currAccount[0]._id);
		this.props.fetchAccountData('properties',currAccount[0]._id);

		let accountSlug = currAccount[0].slug;

		const path = `/account/${accountSlug}`;
		browserHistory.push(path)
	},

	render() {
		return(
			<div className="user-panel">
				<h2>Create New Account</h2>
				<form ref="accountForm" className="login-panel" onSubmit={this.createAccount} >
					<input type="text" ref="name" placeholder="Enter Account Name" />
					<input type="text" ref="email" placeholder="Enter Email" />
					<button type="submit">Submit</button>
				</form>
				<h2>Login</h2>
				<form ref="loginForm" className="login-panel" onSubmit={this.loginAccount} >
					<input type="text" ref="loginEmail" placeholder="Enter Email" />
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
})

export default Login;