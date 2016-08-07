function projects(state = [], action) {
	
	switch(action.type){
		case 'DELETE_PROJECT':
			if(confirm("Are You Sure You Want To Remove This Item?")){
				var i = action.index;

				return {
					...state,
					...state[i] = null
				}
			}

		default:
			return state;
	}
	return state;
}

export default projects;
