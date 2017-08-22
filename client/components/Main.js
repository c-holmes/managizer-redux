import React from 'react';
import classNames from 'classnames/bind';

import ProjectPanel from './ProjectPanel';
import AdminPanel from './AdminPanel';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  sortProjectProperties(propertyOrderArray) {
    // iterate through properties
    Object.keys(this.props.properties).map((key) => {
      if (this.props.properties[key] !== null) {
        // push name & order to array
        return propertyOrderArray.push([key, this.props.properties[key].order]);
      }
      return (null);
    }, this);

    // sort array by order
    propertyOrderArray.sort((a, b) => a[1] - b[1]);
  }

  loadStateFromStorage() {
    const url = window.location.pathname;
    const accountSlug = url.replace('/account/', '');

    if (this.props.account.length === 0) {
      // Browser Local Storage
      if (typeof (Storage) !== 'undefined') {
        const localData = JSON.parse(localStorage.getItem(accountSlug));
        if ('accountId' in localData && localData.accountId !== undefined) {
          this.props.fetchAccountData('account', localData.accountId);
          this.props.fetchAccountData('projects', localData.accountId);
          this.props.fetchAccountData('properties', localData.accountId);
        }
      } else {
        console.log('Sorry! No Web Storage support..');
      }
    }
  }

  togglePanel(event) {
    event.preventDefault();
    if (this.state.isPressed === true) {
      this.state.isPressed = false;
    } else {
      this.state.isPressed = true;
    }
    this.setState({
      isPressed: this.state.isPressed
    });
  }

  render() {
    const appUiState = classNames({
      app: true,
      'admin-open': this.state.isPressed
    });

    return (
      <div className={appUiState} >
        {this.loadStateFromStorage()}
        <ProjectPanel {...this.props} sortProjectProperties={this.sortProjectProperties.bind(this)} />
        <AdminPanel {...this.props} togglePanel={this.togglePanel.bind(this)} sortProjectProperties={this.sortProjectProperties.bind(this)} />
      </div>
    );
  }
}

export default Main;
