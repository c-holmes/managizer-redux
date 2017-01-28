function account(state = [], action) {
	switch(action.type){
		case 'RECEIVE_DATA':
			if(action.route == 'account'){
				state = action.data;
			}

			return state;
	}
	return state;
}
export default account;