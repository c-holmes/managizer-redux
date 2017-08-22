import React from 'react';
import classNames from 'classnames/bind';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      isPressed: false 
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  toggleButton(event){
    event.preventDefault();
    if(this.state.isPressed == true){
      this.state.isPressed = false;
    } else {
      this.state.isPressed = true;
    }
    this.setState({
      isPressed : this.state.isPressed
    })
  }

  sortProjectProperties(propertyArray, type){
    var propertyOrderArray = [];

    propertyArray.map(function(property, key){
      if(property !== null){
        propertyOrderArray.push({key:key, order:property.order, name:property.name});
      }
    }, this)

    propertyOrderArray.sort(function(a,b){
      return a.order - b.order
    });

    if(type == 'edit-field'){
      return propertyOrderArray.map(this.renderEditField.bind(this));
    }else{
      return propertyOrderArray.map(this.renderProjectField.bind(this));
    }
  }

  renderProjectField(property){
    //set sorted property slug
    var propertyValue = this.props.properties[property.key].slug;

    //output project's property based on sort order
    return(
      <li className="cell" key={property.key}>{this.props.details[propertyValue]}</li>
    )
  }

  renderOptions(option){
    if(option !== null){
      return(
        <option key={option._id} value={option.name}>{option.name}</option>
      )
    }
  }

  renderEditField(property){
    //set the edited property slug to variable (variable to be passed to editProject func)
    var propertyValue = this.props.properties[property.key].slug;
    //set the edited project to variable (variable to be passed to editProject func)
    var projectValue = this.props.index;
    var projectId = this.props.details._id;
    
    if(this.props.properties[property.key].type == 'select'){
      var selected = this.props.details[this.props.properties[property.key].slug];
      return(
        <span key={property.key} className="cell">
          <select ref="type" defaultValue={selected} onChange={this.props.editProject.bind(this, projectValue, propertyValue, projectId)}>
            {this.props.properties[property.key].selectOptions.map(this.renderOptions)}
          </select>
        </span>
      )
    } else if(this.props.properties[property.key].type == 'date'){
      return(
        <span key={property.key} className="cell">
          <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              onBlur={this.props.editProject.bind(this, projectValue, propertyValue, projectId)}
          />
        </span>
      )
    } else {
      return(
        <span key={property.key} className="cell">
          <input type="text" value={this.props.details[propertyValue]} onChange={this.props.editProject.bind(this, projectValue, propertyValue, projectId)} />
        </span>
      )
    }
  }

  saveProjectObj(event){
    event.preventDefault();
    this.props.saveProject(this.props.details, this.props.accountId);
    this.toggleButton(event);
  }

  render(){
    var btnClass = classNames({
      'item':true,
      'hide':true,
        'btn-pressed': this.state.isPressed
    });
    var editMode = classNames({
      'options-block':true,
        'edit-active': this.state.isPressed
    });

    if(this.props.details !== null) {
      if(this.props.details !== ''){
        console.log('aaa');
        return(
          <div className="item-group">
            <ul className="item">
              <li className={editMode}>
                <button onClick={this.props.deleteProject.bind(null, this.props.index, this.props.details._id, this.props.accountId)} className="delete" ref="delete">Delete</button>
                <button className="edit-btn" onClick={this.toggleButton.bind(this)}>Edit</button>
                <button className="back-btn" onClick={this.toggleButton.bind(this)}>Back</button>
              </li>
              {this.sortProjectProperties(this.props.properties, 'static-field')}
            </ul>
            <form ref="projectForm" className={btnClass} onSubmit={this.saveProjectObj.bind(this)}>
              <span className="cell">
                <button type="submit" className="save-btn">Save</button>
              </span>
              {this.sortProjectProperties(this.props.properties, 'edit-field')}
            </form>
          </div>  
        )
      } else {
        return (null)
      }
    } else {
      return (null)
    }
  }
}

export default Project;