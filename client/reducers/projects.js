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
		case 'EDIT_PROJECT':
			var e = action.event;
			var projectValue = action.projectValue;
			var propertyValue = action.propertyValue;
			var newState = Object.assign({}, state);
			
			newState[projectValue][propertyValue] = e.target.value;

			return newState;
		case 'ADD_PROPERTY':
			//console.log('adding property');
			//console.log(state);
			var newPropertyFields = action.newPropertyFields;
			var slug = newPropertyFields.slug;
			var newState = Object.assign({}, state);
			var newStateArray = Object.keys(newState);

			//console.log(newState["project1"]);
			// console.log(newStateArray);

			for(var i = 0; i < newStateArray.length; i++ ){
				newState[newStateArray[i]][slug] = "";
			}

			//console.log(newState);

			return newState;
			
		default:
			return state;
	}
	return state;
}

export default projects;
