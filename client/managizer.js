import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.scss';

// Import components
import Main from './components/Main';

// Import react router deps
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Main}>
			</Route>
		</Router>
	</Provider>	
)
render(router, document.getElementById('root'));