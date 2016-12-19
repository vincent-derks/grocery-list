const initialState = {
    foundUser: undefined,
    sharing: false
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
                sharing: true
            }
        case 'CLOSE_SHARER':
            return {
                ...state,
                foundUser: undefined,
                sharing: false
            }
        default:
            return state
    }
}

export default shareReducer
