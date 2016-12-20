export function toggleMenu(){
    return {
        type: 'TOGGLE_MENU'
    }
}

export function toggleOnlineStatus(status){
    return {
        type: 'TOGGLE_ONLINE_STATUS',
        data: status
    }
}
