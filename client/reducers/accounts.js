import fetch from 'isomorphic-fetch';

function accounts(state = [], action) {
	if (!window.location.origin) {
	    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	var origin = window.location.origin;

	switch(action.type){
		case 'CREATE_ACCOUNT':
			console.log('account created');
			var newAccount = action.formData;
			var newState = Object.assign({}, state);

			newState[newAccount.name] = newAccount;

			//serialize data to send to Mongo 
			function serialize(obj) {
			  var str = [];
			  for(var p in obj)
			    if (obj.hasOwnProperty(p)) {
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    }
			  return str.join("&");
			}

			fetch(`${origin}/api/accounts`, {
					method: 'post',  
					headers: {  
					  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
					},  
					body: serialize(newAccount)  
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
			if(action.route == 'accounts'){
				state = action.data;
			}

			return state;

		default:
			return state;
	}
	return state;
}

export default accounts;