const initialState = {
    menuOpen: false,
}

const appReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case 'APP_TOGGLE_MENU':
            return {
                ...state,
                menuOpen: !state.menuOpen
            }
        default:
            return newState
    }
}

export default appReducer
