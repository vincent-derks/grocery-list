import { browserHistory } from 'react-router'

export function signInWithEmailAndPassword(email, password){
    return (dispatch, getState) => {
        const auth = getState().appReducer.firebase.auth()
        auth.signInWithEmailAndPassword(email, password)
        const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
            // Check if user is logged in, then set user email, otherwise set user in Redux to null
            if(firebaseUser){
                dispatch({
                    type: 'USER_CHANGED',
                    data: firebaseUser
                })
            } else {
                dispatch({
                    type: 'USER_CHANGED',
                    data: {
                        user: null,
                        dbUser: null
                    }
                })
            }
        })
    }
}

export function createUserWithEmailAndPassword(name, email, password){
    return (dispatch, getState) => {
        const auth = getState().appReducer.firebase.auth()
        const newUser = auth.createUserWithEmailAndPassword(email, password)
        newUser.then((user)=>{
            const DbRef = getState().appReducer.firebase.database()
            const newDbUser = DbRef.ref('users').child(user.uid).set({
                uid: user.uid,
                name,
                email
            })
            .then(() => {
                dispatch({
                    type: 'USER_CHANGED',
                    data: user
                })
            })
        })
    }
}

export function setUser(user){
    if(user){
        const uid = user.uid    
        return (dispatch, getState) => {
            const DbRef = getState().appReducer.firebase.database()
            DbRef.ref('users').child(uid).on('value', snap => {
                const dbUser = snap.val()
                dispatch({
                    type: 'USER_CHANGED',
                    data: {
                        user, 
                        dbUser
                    }
                })
            })
        }
    }
    return (dispatch) => {
        dispatch({
            type: 'USER_CHANGED',
            data: {
                user: null,
                dbUser: null
            }
        })
    }
}

export function findUser(email){
    return (dispatch, getState) => {
        getState().appReducer.firebase.database().ref('users').orderByChild('email').equalTo(email).once('value', snap => {
            if(snap.val()){
                dispatch({
                    type: 'USER_FOUND',
                    data: snap.val()[Object.keys(snap.val())[0]]
                })
            } else {
                dispatch({
                    type: 'USER_FOUND',
                    data: false
                })
            }
        })
    }
}

export function resetUserFound(){
    return {
        type: 'USER_FOUND',
        data: undefined
    }
}

export function shareList(user, list){
    return (dispatch, getState) => {
        let listState = getState().contentReducer.groceryLists.filter(item => {
            return item.id == list
        })[0]
        if(listState.sharedUser){
            if(!listState.sharedUser[user]){
                getState().appReducer.firebase.database().ref('groceryLists').child(list).child('sharedUser').child(user).set(user)
                dispatch({
                    type: 'LIST_SHARED'
                })
                setTimeout(()=>{
                    dispatch({
                        type: 'CLOSE_SHARER'
                    }, 2000)
                })
            } else {
                console.log('already shared with this user!')
            }
        } else {
            getState().appReducer.firebase.database().ref('groceryLists').child(list).child('sharedUser').child(user).set(user)
            dispatch({
                type: 'LIST_SHARED'
            })
        }

    }
}

export function toggleCreateAccount(){
    return {
        type: 'TOGGLE_CREATE_ACCOUNT'
    }
}

export function toggleShowForgotPasswordEmailInput(){
    return {
        type: 'TOGGLE_SHOW_FORGOT_PASSWORD_EMAIL_INPUT'
    }
}

export function sendForgotPasswordEmail(email){
    return (dispatch, getState) => {
        const auth = getState().appReducer.firebase.auth()
        const sendMail = auth.sendPasswordResetEmail(email)
        sendMail.then(() => {
            dispatch({
                type: 'TOGGLE_SEND_PASSWORD_RESET_EMAIL'
            })
        })
    }
}

export function logout(){
    return (dispatch, getState) => {
        const auth = getState().appReducer.firebase.auth()
        const signOut = auth.signOut()
        signOut.then(()=>{
            dispatch({
                type: 'USER_CHANGED',
                data: null
            })
            browserHistory.push('/')
        })
    }
}


export function updateProfile(userData){
    return (dispatch, getState) => {
        const DbRef = getState().appReducer.firebase.database()
        DbRef.ref('users').child(getState().appReducer.user.uid).set({
            name: userData.name
        }, ()=>{
            dispatch({
                type: 'UPDATE_USER_PROFILE',
                data: {
                    name: userData.name
                }
            })
        })
    }
}