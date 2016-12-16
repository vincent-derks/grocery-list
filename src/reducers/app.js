import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQIhIOOg5WAj_mKWoTNS3NRB7X0Db4EzA",
    authDomain: "groceries-fe1f0.firebaseapp.com",
    databaseURL: "https://groceries-fe1f0.firebaseio.com",
    storageBucket: "groceries-fe1f0.appspot.com",
    messagingSenderId: "718144486878"
}
const Ref = firebase.initializeApp(config)

const initialState = {
    menuOpen: false,
    firebase: Ref,
    user: null
}

const appReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case 'APP_TOGGLE_MENU':
            return {
                ...state,
                menuOpen: !state.menuOpen
            }
        case 'USER_CHANGED':
            let User = state.firebase.auth().currentUser
            return {
                ...state,
                user: User
            }
        default:
            return newState
    }
}

export default appReducer
