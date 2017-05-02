import React from 'react';
import classNames from 'classnames/bind';

class Property extends React.Component {
	constructor (props) {
	  super(props)
	  this.state = {
	    isPressed: false 
	  };
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

	renderPropertyField(key){
		return(
			<li key={key}>{this.props.details[key]}</li>
		)
	}

	renderOptions(key){
		return(
			<option key={key} value={key} >{key}</option>
		)
	}

	renderEditField(key){
		var propertyValue = this.props.index;
		var fieldValue = key;

		if(this.props.properties.type.includes(this.props.details[fieldValue])){
			return(
				<span key={key} className="cell">
					<select ref="type" defaultValue={this.props.details[fieldValue]} onChange={this.props.editProperty.bind(this, propertyValue, fieldValue)}>
						{this.props.properties.type.map(this.renderOptions)}
					</select>
				</span>
			)
		} else {
			return(
				<span key={key} className="cell">
					<input type="text" value={this.props.details[fieldValue]} onChange={this.props.editProperty.bind(this, propertyValue, fieldValue)} />
				</span>
			)
		}
	}

	savePropertyObj(event){
		event.preventDefault();
		this.props.saveProperty(this.props.details, this.props.accountId);
		this.toggleButton(event);
	}

	render(){
		if(this.props.details !== null){ 
			var btnClass = classNames({
				'item':true,
				'hide':true,
			  	'btn-pressed': this.state.isPressed
			});

			return(
				<div className="item-group">
					<ul className='item'>
						<li className="options-block">
							<ul>
								<button className="delete" ref="delete" onClick={this.props.deleteProperty.bind(null, this.props.index, this.props.details._id, this.props.accountId)}>Delete</button>
								<button className="edit-btn" onClick={this.toggleButton.bind(this)}>Edit</button>
								<button className="back-btn" onClick={this.toggleButton.bind(this)}>Back</button>
							</ul>
						</li>
						{Object.keys(this.props.properties).map(this.renderPropertyField.bind(this))}
					</ul>
					<form ref="propertyForm" className={btnClass} onSubmit={this.savePropertyObj.bind(this)}>
						<span className="cell">
							<button type="submit" className="save-btn">Save</button>
						</span>
						{Object.keys(this.props.properties).map(this.renderEditField.bind(this))}
					</form>
				</div>	
			)
		} else {
			return( null )
		}
	}
}

export default Property;