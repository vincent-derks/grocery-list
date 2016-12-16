export function signInWithEmailAndPassword(email, password){
    return (dispatch, getState) => {
        const auth = getState().appReducer.firebase.auth()
        auth.signInWithEmailAndPassword(email, password)
        const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
            // Check if user is logged in, then set user email, otherwise set user in Redux to null
            if(firebaseUser){
                unsubscribe()
                dispatch({
                    type: 'USER_CHANGED',
                    data: firebaseUser
                })
            } else {
                unsubscribe()
                dispatch({
                    type: 'USER_CHANGED',
                    data: null
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
                    type: 'USER_CHANGED'
                })
            })
        })
    }
}

export function setUser(){
    return {
        type: 'USER_CHANGED'
    }
}

export function findUser(email){
    return (dispatch, getState) => {
        getState().appReducer.firebase.database().ref('users').orderByChild('email').equalTo(email).once('value', snap => {
            dispatch({
                type: 'USER_FOUND',
                data: snap.val()[Object.keys(snap.val())[0]]
            })
        })
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
