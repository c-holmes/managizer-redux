import fetch from 'isomorphic-fetch';

function properties(state = [], action) {
	if (!window.location.origin) {
	    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	var origin = window.location.origin;

	switch(action.type){
		case 'DELETE_PROPERTY':
			if(confirm("Are You Sure You Want To Remove This Item?")){
				var index = action.index;
				var propertyId = action.id;
				var accountId = action.accountId;
				var newState = state.slice(0);
				
				fetch(`${origin}/api/accounts/${accountId}/properties/${propertyId}`, {
					method: 'delete'
				})
				.then(response => response.json())
				.then(function(data) {
					console.log(data);
				})

				//remove property from state
				newState[index] = null;
				newState = newState.filter(function(n){ return n != undefined }); 
				return newState;
			}
			return state;

		case 'EDIT_PROPERTY':
			var e = action.event;
			var id = action.projectId;
			var propertyValue = action.propertyValue;
			var fieldValue = action.fieldValue;
			//use slice to clone an array (object.assign was used before)
			var newState = state.slice(0);

			newState[propertyValue][fieldValue] = e.target.value;

			return newState;

		case 'SAVE_PROPERTY':
			var propertyId = action.property._id;
			var propertyEdits = action.property;
			var accountId = action.accountId;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			//console.log(serialize(propertyEdits));

			fetch(`${origin}/api/accounts/${accountId}/properties/${propertyId}`, {
				method: 'put',
				headers: {  
				  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
				},  
				body: serialize(propertyEdits) 
			})

			return state;

		case 'ADD_PROPERTY':
			var newPropertyFields = action.formData;
			console.log(newPropertyFields);
			var accountId = action.accountId;
			var timestamp = (new Date()).getTime().toString();
			// var newState = Object.assign({}, state);
			var newState = state.slice(0);
			
			newPropertyFields['selectOptions'] = [];
			if(newPropertyFields.type == 'date'){
				newPropertyFields['dateType'] = {
					type: 'parentDate',
				};
			}

			function slugify(name){
				var slug = name;
				//replace1 removes special chars, replace2 removes front and back "-", todo understand regex
				slug = slug.replace(/[^a-zA-Z0-9]+/ig, "-").replace(/^-+|-+$/g,'').toLowerCase();
				return slug; 
			}

			//add publish date
			newPropertyFields._id = timestamp;
			newPropertyFields.slug = slugify(newPropertyFields.name);
			//newState[timestamp] = newPropertyFields;
			newState.push(newPropertyFields);

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`${origin}/api/accounts/${accountId}/properties`, {
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

		case 'ADD_SELECT_OPTION':
			//Get Select Option Key
			var propertyKey = action.propertyKey;
			var propertyId = action.propertyId;
			var timestamp = (new Date()).getTime().toString();
			var newOptionObj = action.newOptionObj;
			var accountId = action.accountId;
			// var newState = Object.assign({},state);
			var newState = state.slice(0);

			console.log(newState);
			console.log(propertyKey);

			newOptionObj._id = timestamp;
			newState[propertyKey]['selectOptions'].push(newOptionObj);
			
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`${origin}/api/accounts/${accountId}/properties/${propertyId}/selectOptions`, {
				method: 'post',
				headers: {  
				  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
				},  
				body: serialize(newOptionObj) 
			})

			return newState;

		case 'DELETE_SELECT_OPTION':
			var selectOptionName = action.selectOption.name;

			if(confirm("Are You Sure You Want To Remove " + selectOptionName + "?")){
				var accountId = action.accountId;
				var propertyId = action.propertyId;
				var propertyIndex = action.propertyIndex;
				var selectOptionId = action.selectOption._id;
				var index = action.index;
				var newState = state.slice(0);
				
				fetch(`${origin}/api/accounts/${accountId}/properties/${propertyId}/selectOptions/${selectOptionId}`, {
					method: 'delete'
				})
				.then(response => response.json())
				.then(function(data) {
					console.log(data);
				})

				//remove property from state
				newState[propertyIndex].selectOptions[index] = null;
				newState[propertyIndex].selectOptions = newState[propertyIndex].selectOptions.filter(function(n){ return n != undefined }); 
				return newState;
			}
			return state;

		case 'EDIT_SELECT_OPTION':
			var e = action.event;
			var index = action.index;
			var fieldValue = action.fieldValue;
			var propertyIndex = action.propertyIndex;
			// var newState = Object.assign({}, state);
			var newState = state.slice(0);

			newState[propertyIndex].selectOptions[index][fieldValue] = e.target.value;

			return newState;

		case 'SAVE_SELECT_OPTION':
			var selectOptionEdits = action.selectOption;
			var selectOptionId = action.selectOption._id;
			var propertyId = action.propertyId;
			var accountId = action.accountId;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`${origin}/api/accounts/${accountId}/properties/${propertyId}/selectOptions/${selectOptionId}`, {
				method: 'put',
				headers: {  
				  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
				},  
				body: serialize(selectOptionEdits) 
			})

			return state;

		default:
			return state;
	}
	return state;
}

export default properties;