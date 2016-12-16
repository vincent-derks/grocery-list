import _ from 'lodash'

export function loadGroceries(){
    return (dispatch, getState) => {
        let Groceries = getState().appReducer.firebase.database().ref('groceries')
        Groceries.on('value', snapshot => {
            if(snapshot.val()){
                const groceries = Object.keys(snapshot.val()).map((key, index)=>{
                    return {
                        ...snapshot.val()[key],
                        id: key
                    }
                }).filter((item)=>{
                    return true
                })
                dispatch({
                    type: 'LOAD_GROCERIES',
                    data: groceries
                })
            } else {
                dispatch({
                    type: 'LOAD_GROCERIES',
                    data: []
                })
            }
        })
    }
}

export function toggleMenu(){
    return {
        type: 'APP_TOGGLE_MENU'
    }
}
