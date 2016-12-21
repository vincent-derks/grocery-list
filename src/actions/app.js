export function toggleMenu(){
    return {
        type: 'TOGGLE_MENU'
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
