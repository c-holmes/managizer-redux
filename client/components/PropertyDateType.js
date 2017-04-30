import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class PropertyDateType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    console.log(date);
  }

  handleChangeRaw(value) {
    console.log('yeass');
    console.log(value);
  }

  render() {
    return <DatePicker selected={this.state.startDate} onChange={this.handleChange} onChangeRaw={(event) => this.handleChangeRaw(event.target.value)} />
  }
}

export default PropertyDateType;
