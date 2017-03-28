import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, compse, applyMiddleware } from 'redux';
import { fetchAccounts } from './actions/actionCreators'
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//import the root reducer
import rootReducer from './reducers/index'

import accountFields from './data/accountFields';
import propertyFields from './data/propertyFields';
import selectOptionFields from './data/selectOptionFields';

const loggerMiddleware = createLogger()

//create obj for default state
const defaultState = {
	accountFields,
	propertyFields,
	selectOptionFields
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

