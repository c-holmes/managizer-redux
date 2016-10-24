import fetch from 'isomorphic-fetch';

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
		case 'ADD_PROJECT':
			var newProjectProperties = action.newProjectProperties;
			var timestamp = (new Date()).getTime();
			var newState = Object.assign({}, state);

			newState['project-' + timestamp] = newProjectProperties;

			return newState;

		case 'ADD_PROPERTY':
			//When property is added, project panel needs to be updated with the new property
			var newPropertyFields = action.newPropertyFields;
			var slug = newPropertyFields.slug;
			var newState = Object.assign({}, state);
			var newStateArray = Object.keys(newState);

			for(var i = 0; i < newStateArray.length; i++ ){
				newState[newStateArray[i]][slug] = "";
			} 

			return newState;

		case 'RECEIVE_DATA':
			if(action.route == 'projects'){
				state = action.data;
			}

			return state;

		case 'POST_DATA':
			var newProjectProperties = action.formData;
			var timestamp = (new Date()).getTime();
			var newState = Object.assign({}, state);
			newState['project-' + timestamp] = newProjectProperties;

			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`http://localhost:7770/api/projects`, {
					method: 'post',  
					headers: {  
					  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
					},  
					body: serialize(newProjectProperties)  
				})
				.then(response => response.json())  
				.then(function (data) {  
				  console.log('Request succeeded with JSON response', data);  
				})  
				.catch(function (error) {  
				  console.log('Request failed', error);  
				});
			return newState;
      // .then(response => response.json())
      // .then(json => dispatch(receiveData(json,apiRoute)))

		default:
			return state;
	}
	return state;
}

export default projects;
