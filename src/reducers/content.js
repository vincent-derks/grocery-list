const initialState = {
    groceries: []
}

const contentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOAD_GROCERIES':
            return {
                ...state,
                groceries: action.data
            }
        default:
            return state
    }
}

export default contentReducer
