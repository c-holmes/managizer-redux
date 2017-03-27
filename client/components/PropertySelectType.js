import React from 'react';
import classNames from 'classnames/bind';

//add SelectOptionFields same as propertyFields

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

	render(){
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
							<button className="delete" ref="delete" >Delete</button>
							<button className="edit-btn" onClick={this.toggleButton}>Edit</button>
							<button className="back-btn" onClick={this.toggleButton}>Back</button>
						</ul>
					</li>
					{Object.keys(this.props.details).map(this.renderSelectOptionFields)}
				</ul>
				<form ref="propertyForm" className={btnClass} onSubmit={this.savePropertyObj}>
					<span className="cell">
						<button type="submit" className="save-btn">Save</button>
					</span>
				</form>
			</div>	
		)
	}
})

export default PropertySelectType;