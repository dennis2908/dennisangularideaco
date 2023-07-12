var retrievedObject = localStorage.getItem('angularJS');
		var TheangularJS = JSON.parse(retrievedObject)

const initialState = {
  data : TheangularJS
}


export function reducer(state = initialState, action) {
	var retrievedObject = localStorage.getItem('angularJS');
		var TheangularJS = JSON.parse(retrievedObject)

	if(action.type==="CHANGE_STATE"){
		if(action.payload){
			TheangularJS['authLogin'] = action.payload.authUserName
			TheangularJS['authName'] = action.payload.authName
			TheangularJS['authUserName'] = action.payload.authUserName
			TheangularJS['authRoleName'] = action.payload.authRoleName
			TheangularJS['authRoleAssign'] = action.payload.authRoleAssign
			localStorage.setItem('angularJS', JSON.stringify(TheangularJS));
			return {
				  ...state,
				  data:action.payload
			  }
		}
	}
	
	
    return state
}