export function toggleMenu(){
    return {
        type: 'TOGGLE_MENU'
    }
}

export function toggleAddList(){
    return {
        type: 'TOGGLE_ADD_LIST'
    }
}

let timeOutRunning = false
let setTimeoutForOnlineStatus = (status) => {
    timeOutRunning = true
    setTimeout(()=>{
        toggleOnlineStatus(status)
        timeOutRunning = false
    }, 1000)
}
export function toggleOnlineStatus(status){
    return (dispatch, getState) => {
        if(!timeOutRunning){
            setTimeoutForOnlineStatus(status)
        } else {
            dispatch({
                type: 'TOGGLE_ONLINE_STATUS',
                data: status
            })
        }
    }
}
