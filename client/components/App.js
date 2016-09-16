import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
	return{
		projects: state.projects,
		properties: state.properties,
		propertyFields: state.propertyFields,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;