//add Project
export function addProject(index) {
	return {
		type: 'ADD_PROJECT',
		index
	}
}

//edit Project
export function editProject( projectValue, propertyValue, event ) {
	return {
		type: 'EDIT_PROJECT',
		projectValue,
		propertyValue,
		event,
	}
}

//delete Project
export function deleteProject(index) {
	return{
		type: 'DELETE_PROJECT',
		index
	}
}

//load Sample Projects


//add a Property
export function addProperty(index) {
	return {
		type: 'ADD_PROPERTY',
		index
	}
}

//edit Property


//delete Property


//load Sample Properties
