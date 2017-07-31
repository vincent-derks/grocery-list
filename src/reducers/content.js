const initialState = {
    groceryLists: [],
    singleList: [],
    filter: 'all',
    loadingLists: false
}

const contentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOAD_LISTS':
            return {
                ...state,
                groceryLists: action.data
            }
        case 'LOADING_LISTS':
            return {
                ...state,
                loadingLists: action.data
            }
        case 'GET_LIST':
            return {
                ...state,
                singleList:  {
                    ...state.singleList,
                    list: action.data.list,
                    id: action.data.id
                }
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
