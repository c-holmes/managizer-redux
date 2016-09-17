//add Project
export function addProject(newProjectProperties) {
	return {
		type: 'ADD_PROJECT',
		newProjectProperties
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
export function addProperty(newPropertyFields) {
	return {
		type: 'ADD_PROPERTY',
		newPropertyFields,
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

//delete Property
export function deleteProperty(index) {
	return {
		type: 'DELETE_PROPERTY',
		index
	}
}

//load Sample Properties
