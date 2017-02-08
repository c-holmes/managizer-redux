function account(state = [], action) {
	switch(action.type){
		case 'RECEIVE_DATA':
			if(action.route == 'account'){
				state = action.data;
			}

			return state;
		case 'CREATE_ACCOUNT':
			return action.formData;
	}
	return state;
}
export default account;