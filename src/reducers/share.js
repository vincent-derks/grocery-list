const initialState = {
    foundUser: undefined
}

const shareReducer = (state = initialState, action) => {
    switch(action.type){
        case 'USER_FOUND':
            return {
                ...state,
                foundUser: action.data
            }
        case 'LIST_SHARED':
            return {
                ...state,
                foundUser: undefined
            }
        default:
            return state
    }
}

export default shareReducer
