import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';
import accounts from './accounts';
import accountFields from './accountFields';
import projects from './projects';
import properties from './properties';
import propertyFields from './propertyFields';
import selectOptionFields from './selectOptionFields';

const rootReducer = combineReducers({ account, accounts, accountFields, projects, properties, propertyFields, selectOptionFields, routing:routerReducer });

export default rootReducer;