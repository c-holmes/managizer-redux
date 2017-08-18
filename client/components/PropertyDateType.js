import React from 'react';

class PropertyDateType extends React.Component{
	render(){
		return(
			<div  className="sect">
				<h3>Configure {this.props.properties[this.props.index].name}</h3>
				<div>
					<span>
						Date Type:
					</span>
					<select>
						<option>Parent</option>
						<option>Child</option>
					</select>
				</div>
				<div>
					<span>
						Choose Parent Date:
					</span>
					<select>
						<option>Start Date</option>
						<option>End Date</option>
					</select>
				</div>
				<div>
					<span>
						How Many Days:
					</span>
					<input type="number" />
				</div>
			</div>
		)
	}
}

export default PropertyDateType;
