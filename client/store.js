import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, compse, applyMiddleware } from 'redux';
import { fetchAccounts } from './actions/actionCreators'
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//import the root reducer
import rootReducer from './reducers/index'

//import test data
//import projects from './data/projects';
//import properties from './data/properties';
import accountFields from './data/accountFields';
import propertyFields from './data/propertyFields';

const loggerMiddleware = createLogger()

// fetch('http://localhost:7770/api/projects').then(function(response) { 
// 	// Convert to JSON
// 	return projects = response.json();
// }).then(function(j) {
// 	// Yay, `j` is a JavaScript object
// 	console.log(j); 
// });

//fetchProjects('test');

//create obj for default state
const defaultState = {
	//projects,
	//properties,
	accountFields,
	propertyFields
};

const store = createStore(
	rootReducer,
	defaultState,
	applyMiddleware(
	  thunkMiddleware, // lets us dispatch() functions
	  loggerMiddleware // neat middleware that logs actions
	)
)

store.dispatch(fetchAccounts()).then(() =>
  	console.log(store.getState())
)

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

