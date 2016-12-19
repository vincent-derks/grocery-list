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
    user: null,
    showCreateAccount: false,
    forgotPasswordEmailInput: false,
    forgotPasswordEmailSend: false
}

const appReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case 'TOGGLE_MENU':
            return {
                ...newState,
                menuOpen: !newState.menuOpen
            }
        case 'USER_CHANGED':
            let User = newState.firebase.auth().currentUser
            return {
                ...newState,
                user: action.data
            }
        case 'TOGGLE_CREATE_ACCOUNT':
            return {
                ...newState,
                showCreateAccount: !newState.showCreateAccount
            }
        case 'TOGGLE_SHOW_FORGOT_PASSWORD_EMAIL_INPUT':
            return {
                ...newState,
                forgotPasswordEmailInput: !newState.forgotPasswordEmailInput
            }
        case 'TOGGLE_SEND_PASSWORD_RESET_EMAIL':
            return {
                ...newState,
                forgotPasswordEmailSend: !newState.forgotPasswordEmailSend,
                forgotPasswordEmailInput: false
            }
        default:
            return newState
    }
}

export default appReducer
