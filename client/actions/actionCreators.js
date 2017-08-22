import fetch from 'isomorphic-fetch';

export function createAccount(formData) {
  return {
    type: 'CREATE_ACCOUNT',
    formData
  };
}

export function loginAccount(formData) {
  return {
    type: 'LOGIN_ACCOUNT',
    formData
  };
}

export function addProject(formData, accountId) {
  return {
    type: 'ADD_PROJECT',
    formData,
    accountId,
  };
}

export function editProject(projectValue, propertyValue, projectId, event) {
  return {
    type: 'EDIT_PROJECT',
    projectValue,
    propertyValue,
    projectId,
    event,
  };
}

// save edited Project
export function saveProject(project, accountId) {
  return {
    type: 'SAVE_PROJECT',
    project,
    accountId
  };
}

export function deleteProject(index, id, accountId) {
  return {
    type: 'DELETE_PROJECT',
    index,
    id,
    accountId
  };
}

export function requestData(apiRoute) {
  return {
    type: 'REQUEST_DATA',
    apiRoute
  };
}

export function receiveData(json, apiRoute) {
  return {
    type: 'RECEIVE_DATA',
    route: apiRoute,
    data: json,
    receivedAt: Date.now()
  };
}

// thunk - return a function to grab data from db and load as state
export function fetchAccounts() {
  return (dispatch) => {
    dispatch(requestData('accounts'));
    if (!window.location.origin) {
      window.location.origin = `${window.location.protocol} // ${window.location.hostname}  ${window.location.port ? ':' + window.location.port : ''}`;
    }
    const origin = window.location.origin;

    return fetch(`${origin}/api/accounts`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json, 'accounts')));
  };
}

// thunk - load project & property state based on account id
export function fetchAccountData(apiRoute, id) {
  return (dispatch) => {
    if (!window.location.origin) {
      window.location.origin = `${window.location.protocol} // ${window.location.hostname}  ${window.location.port ? ':' + window.location.port : ''}`;
    }
    const origin = window.location.origin;

    if (apiRoute === 'account') {
      return fetch(`${origin}/api/accounts/${id}/`)
        .then(response => response.json())
        .then(json => dispatch(receiveData(json, apiRoute)));
    }
    return fetch(`${origin}/api/accounts/${id}/${apiRoute}/`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json, apiRoute)));
  };
}

export function addProperty(formData, accountId) {
  return {
    type: 'ADD_PROPERTY',
    formData,
    accountId,
  };
}

export function editProperty(propertyValue, fieldValue, event) {
  return {
    type: 'EDIT_PROPERTY',
    propertyValue,
    fieldValue,
    event
  };
}

export function saveProperty(property, accountId) {
  return {
    type: 'SAVE_PROPERTY',
    property,
    accountId
  };
}

export function deleteProperty(index, id, accountId) {
  return {
    type: 'DELETE_PROPERTY',
    index,
    id,
    accountId
  };
}

// add a Select Option on a Property
export function addSelectOption(propertyKey, propertyId, newOptionObj, accountId) {
  return {
    type: 'ADD_SELECT_OPTION',
    propertyKey,
    propertyId,
    newOptionObj,
    accountId
  };
}

// delete Select Option on a Property
export function deleteSelectOption(index, accountId, propertyId, propertyIndex, selectOption) {
  return {
    type: 'DELETE_SELECT_OPTION',
    index,
    accountId,
    propertyId,
    propertyIndex,
    selectOption
  };
}

// edit Select Option on a Property
export function editSelectOption(index, fieldValue, propertyIndex, event) {
  return {
    type: 'EDIT_SELECT_OPTION',
    index,
    fieldValue,
    propertyIndex,
    event
  };
}

// save Select Option on a Property
export function saveSelectOption(selectOption, propertyId, accountId) {
  return {
    type: 'SAVE_SELECT_OPTION',
    selectOption,
    propertyId,
    accountId
  };
}
