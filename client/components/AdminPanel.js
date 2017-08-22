import React from 'react';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import PropertySelectTypeGroup from './PropertySelectTypeGroup';
import ProjectForm from './ProjectForm';
import PropertyDateType from './PropertyDateType';

class AdminPanel extends React.Component {
  renderSelectOptionGroups(key) {
    if (this.props.properties[key] !== null) {
      if (this.props.properties[key].type === 'select') {
        return <PropertySelectTypeGroup key={key} index={key} {...this.props} />;
      }
    }
    return (null);
  }

  renderDateTypes(key) {
    if (this.props.properties[key] !== null) {
      if (this.props.properties[key].type === 'date') {
        return <PropertyDateType key={key} index={key} {...this.props} />;
      }
    }
    return (null);
  }

  render() {
    return (
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
          {Object.keys(this.props.properties).map(this.renderSelectOptionGroups.bind(this))}
          {Object.keys(this.props.properties).map(this.renderDateTypes.bind(this))}
          <ProjectForm {...this.props} />
        </div>
      </div>
    );
  }
}

export default AdminPanel;
