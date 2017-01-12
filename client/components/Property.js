import React from 'react';
import classNames from 'classnames/bind';

const Property = React.createClass({
	getInitialState () {
		return { isPressed : false };
	},

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
	},

	renderPropertyField(key){
		return(
			<li key={key}>{this.props.details[key]}</li>
		)
	},

	renderEditField(key){
		var propertyValue = this.props.index;
		var fieldValue = key;

		return(
			<span key={key} className="cell">
				<input type="text" value={this.props.details[fieldValue]} onChange={this.props.editProperty.bind(this, propertyValue, fieldValue)} />
			</span>
		)
	},

	savePropertyObj(event){
		event.preventDefault();
		console.log(this.props.details);
		this.props.saveProperty(this.props.details);
		this.toggleButton(event);
	},

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
								<button className="delete" ref="delete" onClick={this.props.deleteProperty.bind(null, this.props.index, this.props.details._id)}>Delete</button>
								<button className="edit-btn" onClick={this.toggleButton}>Edit</button>
								<button className="back-btn" onClick={this.toggleButton}>Back</button>
							</ul>
						</li>
						{Object.keys(this.props.properties).map(this.renderPropertyField)}
					</ul>
					<form ref="propertyForm" className={btnClass} onSubmit={this.savePropertyObj}>
						<span className="cell">
							<button type="submit" className="save-btn">Save</button>
						</span>
						{Object.keys(this.props.properties).map(this.renderEditField)}
					</form>
				</div>	
			)
		} else {
			return( null )
		}
	}
});

export default Property;