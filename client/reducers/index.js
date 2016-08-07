import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import projects from './projects';
import properties from './properties';
import propertyField from './propertyField';

const rootReducer = combineReducers({ projects, properties, propertyField, routing:routerReducer });

export default rootReducer;