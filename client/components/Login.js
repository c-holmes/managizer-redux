import React from 'react';
import { browserHistory } from 'react-router';

class Login extends React.Component {
  createAccount(event) {
    event.preventDefault();
    const newAccountFields = {};
    const timestamp = (new Date()).getTime();

    function slugify(name) {
      // remove special chars, then remove front and back "-", 
      return name.replace(/[^a-zA-Z0-9]+/ig, '-').replace(/^-+|-+$/g, '').toLowerCase();
    }

    const id = timestamp.toString();
    const slug = slugify(this.refs.name.value);

    newAccountFields._id = id;
    newAccountFields.slug = slug;
    newAccountFields.projects = [];
    newAccountFields.properties = [];

    Object.keys(this.props.accountFields).map(function(key) {
      newAccountFields[key] = this.refs[key].value;
    }.bind(this));

    this.props.createAccount(newAccountFields);

    // Browser Local Storage
    if (typeof (Storage) !== 'undefined') {
      const saveData = JSON.parse(localStorage[slug] || null) || {};
      saveData.accountId = id;
      saveData.accountSlug = slug;
      saveData.loginTimestamp = new Date().getTime();
      localStorage[slug] = JSON.stringify(saveData);
    } else {
      // Sorry! No Web Storage support..
    }

    const path = `/account/${slug}`;
    browserHistory.push(path);
  }

  loginAccount(event) {
    event.preventDefault();
    const loginEmail = this.refs.loginEmail.value;
    const accountsArray = this.props.accounts;

    // find account based off email provided
    const currAccount = accountsArray.filter(obj => obj.email === loginEmail);

    this.props.fetchAccountData('account', currAccount[0]._id);
    this.props.fetchAccountData('projects', currAccount[0]._id);
    this.props.fetchAccountData('properties', currAccount[0]._id);

    const accountSlug = currAccount[0].slug;
    const path = `/account/${accountSlug}`;

    // Browser Local Storage
    if (typeof (Storage) !== 'undefined') {
      const saveData = JSON.parse(localStorage[accountSlug] || null) || {};
      saveData.accountId = currAccount[0]._id;
      saveData.accountSlug = accountSlug;
      saveData.accountEmail = loginEmail;
      saveData.loginTimestamp = new Date().getTime();
      localStorage[accountSlug] = JSON.stringify(saveData);
    } else {
      // Sorry! No Web Storage support..
    }

    browserHistory.push(path);
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <img className="logo" src="../styles/images/managizr-logo.png" alt="logo" title="logo" />
          <div className="box split">
            <div className="container">
              <h2>Create New Account</h2>
              <form ref="accountForm" className="login-panel" onSubmit={this.createAccount.bind(this)} >
                <input type="text" ref="name" placeholder="Enter Account Name" />
                <input type="text" ref="email" placeholder="Enter Email" />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="container">
              <h2>Login</h2>
              <form ref="loginForm" className="login-panel" onSubmit={this.loginAccount.bind(this)} >
                <input type="text" ref="loginEmail" placeholder="Enter Email" />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
