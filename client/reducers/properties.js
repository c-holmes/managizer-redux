import fetch from 'isomorphic-fetch';

function properties(state = [], action) {

	switch(action.type){
		case 'DELETE_PROPERTY':
			if(confirm("Are You Sure You Want To Remove This Item?")){
				var index = action.index;
				var id = action.id;

				console.log(action);
				console.log(id);
				
				fetch('http://localhost:7770/api/properties/' + id, {
					method: 'delete'
				})
				.then(response => response.json())
				.then(function(data) {
					console.log(data);
				})

				//remove property from state
				return {
					...state,
					...state[index] = null
				}
			}
			return state;

		case 'EDIT_PROPERTY':
			var e = action.event;
			var id = action.projectId;
			var propertyValue = action.propertyValue;
			var fieldValue = action.fieldValue;
			var newState = Object.assign({}, state);

			newState[propertyValue][fieldValue] = e.target.value;

			return newState;

		case 'SAVE_PROPERTY':
			var id = action.property._id;
			var propertyEdits = action.property;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch('http://localhost:7770/api/properties/' + id, {
				method: 'put',
				headers: {  
				  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
				},  
				body: serialize(propertyEdits) 
			})

			return state;

		case 'ADD_PROPERTY':
			var newPropertyFields = action.formData;
			var timestamp = (new Date()).getTime().toString();
			var newState = Object.assign({}, state);

			function slugify(name){
				var slug = name;
				//replace1 removes special chars, replace2 removes front and back "-", todo understand regex
				slug = slug.replace(/[^a-zA-Z0-9]+/ig, "-").replace(/^-+|-+$/g,'').toLowerCase();
				return slug; 
			}

			//add publish date
			newPropertyFields._id = timestamp;
			newPropertyFields.slug = slugify(newPropertyFields.name);
			newState[timestamp] = newPropertyFields;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`http://localhost:7770/api/properties`, {
					method: 'post',  
					headers: {  
					  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
					},  
					body: serialize(newPropertyFields)
				})
				.then(response => response.json())
				.then(function (data) {
					console.log('Request succeeded with JSON response', data);  
				})
				.catch(function (error) {
					console.log('Request failed', error);
				});
			return newState;

		case 'RECEIVE_DATA':
			if(action.route == 'properties'){
				state = action.data;
			}

			return state;

		default:
			return state;
	}
	return state;
}

export default properties;