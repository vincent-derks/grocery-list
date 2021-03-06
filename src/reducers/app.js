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
    addListOpen: false,
    onlineStatus: true,
    firebase: Ref,
    user: undefined,
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
        case 'TOGGLE_ADD_LIST':
            return {
                ...newState,
                addListOpen: !newState.addListOpen
            }
        case 'TOGGLE_ONLINE_STATUS':
            return {
                ...newState,
                onlineStatus: action.data
            }
        case 'USER_CHANGED':
            return {
                ...newState,
                user: action.data.user,
                dbUser: action.data.dbUser
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
        case 'UPDATE_USER_PROFILE':
            return {
                ...newState,
                dbUser: {
                    name: action.data.name
                }
            }
        default:
            return newState
    }
}

export default appReducer
