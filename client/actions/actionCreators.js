import fetch from 'isomorphic-fetch';

export function createAccount(formData) {
	return {
		type: 'CREATE_ACCOUNT',
		formData
	}
}

export function loginAccount(formData) {
	return {
		type: 'LOGIN_ACCOUNT',
		formData
	}
}

//add Project
export function addProject(formData, accountId) {
	return {
		type: 'ADD_PROJECT',
		formData,
		accountId,
	}
}

//edit Project
export function editProject( projectValue, propertyValue, projectId, event ) {
	return {
		type: 'EDIT_PROJECT',
		projectValue,
		propertyValue,
		projectId,
		event,
	}
}

//save edited Project
export function saveProject(project, accountId ){
	return {
		type: 'SAVE_PROJECT',
		project,
		accountId
	}
}

//delete Project
export function deleteProject(index, id, accountId) {
	return{
		type: 'DELETE_PROJECT',
		index,
		id,
		accountId
	}
}

//request Data
export function requestData(apiRoute) {
	return{
		type: 'REQUEST_DATA',
		apiRoute
	}
}

//recieve Data
export function receiveData(json,apiRoute) {
	return{
		type: 'RECEIVE_DATA',
		route: apiRoute,
		data: json,
		receivedAt: Date.now()
	}
}

//thunk - return a function to grab data from db and load as state
export function fetchAccounts() {
  return function (dispatch) {
    dispatch(requestData('accounts'))

    return fetch(`http://localhost:7770/api/accounts`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json,'accounts')))
  }
}

//thunk - load project & property state based on account id
export function fetchAccountData(apiRoute,id) {
	return function (dispatch) {
		if(apiRoute == 'account'){
			return fetch(`http://localhost:7770/api/accounts/${id}/`)
			  .then(response => response.json())
			  .then(json => dispatch(receiveData(json,apiRoute)))
		} else {
			return fetch(`http://localhost:7770/api/accounts/${id}/${apiRoute}/`)
			  .then(response => response.json())
			  .then(json => dispatch(receiveData(json,apiRoute)))
		}
	}
}

//add a Property
export function addProperty(formData) {
	return {
		type: 'ADD_PROPERTY',
		formData,
	}
}

//edit Property
export function editProperty( propertyValue, fieldValue, event ) {
	return {
		type: 'EDIT_PROPERTY',
		propertyValue,
		fieldValue,
		event
	}
}

//save Property
export function saveProperty(property){
	return {
		type: 'SAVE_PROPERTY',
		property
	}
}

//delete Property
export function deleteProperty(index, id) {
	return {
		type: 'DELETE_PROPERTY',
		index,
		id
	}
}

//load Sample Properties
