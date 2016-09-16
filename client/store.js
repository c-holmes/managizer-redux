import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//import the root reducer
import rootReducer from './reducers/index'

import projects from './data/projects';
import properties from './data/properties';
import propertyFields from './data/propertyFields';

console.log(propertyFields);

//create obj for default state
const defaultState = {
	projects,
	properties,
	propertyFields
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

