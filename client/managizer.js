import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.scss';

// Import components
import App from './components/App';
import Account from './components/Account';

// Import react router deps
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Account}></Route>
			<Route path="/account/:accountId" component={App}></Route>
		</Router>
	</Provider>	
)
render(router, document.getElementById('root'));