import React from 'react';
import classNames from 'classnames/bind';

const PropertySelectType = React.createClass({
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

	renderSelectOptionFields(key){
		return(
			<li key={key}>{this.props.details[key]}</li>
		)
	},

	renderEditField(key){
		var index = this.props.index;
		var fieldValue = key;
		var propertyIndex = this.props.propertyIndex;
		return(
			<span key={key} className="cell">
				<input type="text" value={this.props.details[fieldValue]} onChange={this.props.editSelectOption.bind(this, index, fieldValue, propertyIndex)} />
			</span>
		)
	},

	saveSelectOptionObj(event){
		event.preventDefault();
		this.props.saveSelectOption(this.props.details, this.props.propertyId, this.props.accountId);
		this.toggleButton(event);
	},

	render(){
		var btnClass = classNames({
			'item':true,
			'hide':true,
		  	'btn-pressed': this.state.isPressed
		});
		if(this.props.details !== null){
			return(
				<div className="item-group">
					<ul className='item'>
						<li className="options-block">
							<ul>
								<button className="delete" ref="delete" onClick={this.props.deleteSelectOption.bind(null, this.props.index, this.props.accountId, this.props.propertyId, this.props.propertyIndex, this.props.details)} >Delete</button>
								<button className="edit-btn" onClick={this.toggleButton}>Edit</button>
								<button className="back-btn" onClick={this.toggleButton}>Back</button>
							</ul>
						</li>
						{Object.keys(this.props.selectOptionFields).map(this.renderSelectOptionFields)}
					</ul>
					<form ref="propertyForm" className={btnClass} onSubmit={this.saveSelectOptionObj}>
						<span className="cell">
							<button type="submit" className="save-btn">Save</button>
						</span>
						{Object.keys(this.props.selectOptionFields).map(this.renderEditField)}
					</form>
				</div>	
			)
		}
	}
})

export default PropertySelectType;