import fetch from 'isomorphic-fetch';

function accounts(state = [], action) {
	switch(action.type){
		case 'CREATE_ACCOUNT':
			console.log('account created');
			var newAccount = action.formData;
			var timestamp = (new Date()).getTime();
			var newState = Object.assign({}, state);

			console.log(newAccount);

			function slugify(name){
				var slug = name;
				//replace1 removes special chars, replace2 removes front and back "-", todo understand regex
				slug = slug.replace(/[^a-zA-Z0-9]+/ig, "-").replace(/^-+|-+$/g,'').toLowerCase();
				return slug; 
			}

			newAccount['_id'] = timestamp.toString();
			newAccount['slug'] = slugify(newAccount.name);
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

			fetch(`http://localhost:7770/api/accounts`, {
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