import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import projects from './projects';
import properties from './properties';
import propertyFields from './propertyFields';

const rootReducer = combineReducers({ projects, properties, propertyFields, routing:routerReducer });

export default rootReducer;