const initialState = {
    groceries: [],
    filter: null
}

const contentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOAD_GROCERIES':
            return {
                ...state,
                groceries: action.data
            }
        case 'CHANGE_FILTER':
            return {
                ...state,
                filter: action.data
            }
        default:
            return state
    }
}

export default contentReducer
