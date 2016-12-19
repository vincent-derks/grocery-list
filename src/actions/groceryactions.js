import slug from 'slug'

export function getLists(){
    return (dispatch, getState) => {
        let dbref = getState().appReducer.firebase.database()
        let lists = dbref.ref('groceryLists')
        lists.on('value', snapshot => {
            if(snapshot.val()){
                const lists = Object.keys(snapshot.val()).map((key)=>{
                    return {
                        ...snapshot.val()[key],
                        id: key
                    }
                }).filter( item => {
                    if(item.sharedUser){
                        if(item.sharedUser[getState().appReducer.user.uid]== getState().appReducer.user.uid){
                            return true
                        }
                    }
                    if(getState().appReducer.user){
                        return item.owner === getState().appReducer.user.uid
                    }
                })
                dispatch({
                    type: 'LOAD_LISTS',
                    data: lists
                })
            } else {
                dispatch({
                    type: 'LOAD_LISTS',
                    data: []
                })
            }
        })
    }
}

export function addGroceryList(name){
    return (dispatch, getState) => {
        let dbref = getState().appReducer.firebase.database()
        let newList = dbref.ref('groceryLists').push()
        newList.set({
            name,
            owner: getState().appReducer.user.uid,
            slug: slug(name)
        })
    }
}

export function removeList(key){5
    return (dispatch, getState) => {
        let dbref = getState().appReducer.firebase.database()
        const list = getState().contentReducer.groceryLists.filter( item => {
            return item.id == key
        })[0]
        const user = getState().appReducer.user.uid
        if(list.owner == user){
            dbref.ref('groceryLists').child(key).remove()
        } else {
            dbref.ref('groceryLists').child(key).child('sharedUser').child(user).remove()
        }
    }
}

export function getList(slug){
    return (dispatch, getState) => {
        const key = getState().contentReducer.groceryLists.filter( item => {
            return item.slug == slug
        }).map( item => {
            return item.id
        })
        let dbref = getState().appReducer.firebase.database()
        let singleList = dbref.ref('groceryLists/' + key + '/list' )
        singleList.on('value', snapshot => {
            dispatch({
                type: 'GET_LIST',
                data: {
                    list: snapshot.val(),
                    id: key[0]
                }
            })
        })
    }
}

export function changeFilter(filter){
    return {
        type: 'CHANGE_FILTER',
        data: filter
    }
}

export function addGrocery(value, amount){
    return (dispatch, getState) => {
        const list = getState().contentReducer.singleList.id
        let newGrocery = getState().appReducer.firebase.database().ref('groceryLists').child(list).child('list').push()
        newGrocery.set({
            value,
            amount,
            done: false
        })
    }
}

export function toggleGroceryStatus(key){
    return (dispatch, getState) => {
        const listKey = getState().contentReducer.singleList.id
        let Groceries = getState().appReducer.firebase.database().ref('groceryLists')
        let grocery = Groceries.child(listKey).child('/list/' + key)
        grocery.once('value', snapshot => {
            grocery.set({
                ...snapshot.val(),
                done: !snapshot.val().done
            })
        })
    }
}

export function removeGrocery(key){
    return (dispatch, getState) => {
        const listKey = getState().contentReducer.singleList.id
        let Groceries = getState().appReducer.firebase.database().ref('groceryLists')
        let grocery = Groceries.child(listKey).child('/list/' + key).remove()
    }
}
