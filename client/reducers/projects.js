import fetch from 'isomorphic-fetch';

function projects(state = [], action) {
	if (!window.location.origin) {
	    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	var origin = window.location.origin;
	
	switch(action.type){
		case 'DELETE_PROJECT':
			if(confirm("Are You Sure You Want To Remove This Item?")){
				var index = action.index;
				var projId = action.id;
				var accountId = action.accountId;
				
				fetch(`${origin}/api/accounts/${accountId}/projects/${projId}`, {
					method: 'delete'
				})
				.then(response => response.json())
				.then(function(data) {
					console.log(data);
				})

				//remove project from state
				return {
					...state,
					...state[index] = null
				}
			}
		case 'EDIT_PROJECT':
			var e = action.event;
			var id = action.projectId;
			var projectValue = action.projectValue;
			var propertyValue = action.propertyValue;
			var newState = Object.assign({}, state);
			
			newState[projectValue][propertyValue] = e.target.value;

			return newState;

		case 'SAVE_PROJECT':
			var projId = action.project._id;
			var accountId = action.accountId;
			var projectEdits = action.project;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`${origin}/api/accounts/${accountId}/projects/${projId}`, {
				method: 'put',
				headers: {  
				  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
				},  
				body: serialize(projectEdits) 
			})

			return state;

		case 'ADD_PROJECT':
			var newProjectProperties = action.formData;
			var accountId = action.accountId;
			var timestamp = (new Date()).getTime();
			var newState = Object.assign({}, state);
			//add publish date
			newProjectProperties['_id'] = timestamp.toString();
			newState[timestamp] = newProjectProperties;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`${origin}/api/accounts/${accountId}/projects`, {
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

		case 'ADD_PROPERTY':
			//When property is added, project panel needs to be updated with the new property
			if(state.length > 0 ){
				var newState = Object.assign({}, state);
				var newPropertyFields = action.formData;
				var slug = newPropertyFields.slug;
				var newStateArray = Object.keys(newState);

				console.log(newStateArray);

				for(var i = 0; i < newStateArray.length; i++ ){
					newState[newStateArray[i]][slug] = "";
				} 
				return newState;
			} else {
				return state;
			}

		case 'RECEIVE_DATA':
			if(action.route == 'projects'){
				state = action.data;
			}

			return state;

		default:
			return state;
	}
	return state;
}

export default projects;
