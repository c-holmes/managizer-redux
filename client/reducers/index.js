import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import accounts from './accounts';
import accountFields from './accountFields';
import projects from './projects';
import properties from './properties';
import propertyFields from './propertyFields';

const rootReducer = combineReducers({ accounts, accountFields, projects, properties, propertyFields, routing:routerReducer });

export default rootReducer;