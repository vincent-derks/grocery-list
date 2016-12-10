import firebase from 'firebase'
import _ from 'lodash'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQIhIOOg5WAj_mKWoTNS3NRB7X0Db4EzA",
    authDomain: "groceries-fe1f0.firebaseapp.com",
    databaseURL: "https://groceries-fe1f0.firebaseio.com",
    storageBucket: "groceries-fe1f0.appspot.com",
    messagingSenderId: "718144486878"
}
firebase.initializeApp(config)
let Groceries = firebase.database().ref('groceries')
window.Groceries = Groceries

export function loadGroceries(){
    return (dispatch) => {
        Groceries.on('value', snapshot => {
            dispatch({
                type: 'LOAD_GROCERIES',
                data: snapshot.val()
            })
        })
    }
}

export function toggleMenu(){
    return {
        type: 'APP_TOGGLE_MENU'
    }
}

export function addGrocery(value, amount){
    let newGrocery = Groceries.push()
    newGrocery.set({
        value,
        amount,
        done: false
    })
}

export function toggleGroceryStatus(key){
    let grocery = Groceries.child(key)
    grocery.once('value', snapshot => {
        grocery.set({
            ...snapshot.val(),
            done: !snapshot.val().done
        })
    })
}

export function removeGrocery(key){
    let grocery = Groceries.child(key).remove()
}
