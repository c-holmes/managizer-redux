import fetch from 'isomorphic-fetch';

function accounts(state = [], action) {
	switch(action.type){
		case 'CREATE_ACCOUNT':
			console.log('account created');
			return state;

		default:
			return state;
	}
	return state;
}

export default accounts;