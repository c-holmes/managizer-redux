import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import projects from './projects';
import properties from './properties';

const rootReducer = combineReducers({ projects, properties, routing:routerReducer });

export default rootReducer;