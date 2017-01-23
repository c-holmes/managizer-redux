import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
// import Main from './Main';
import Login from './Login';

function mapStateToProps(state) {
	return{
		accounts: state.accounts,
		accountFields: state.accountFields,
		// projects: state.projects,
		// properties: state.properties,
		// propertyFields: state.propertyFields,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
}

const Account = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Account;