const notificationReducer = (state = null, action) => {
    switch (action.type){
    case "SET_NOTIFICATION":
        return action.data
    case "RESET_NOTIFICATION":
        return null
    default:
    }

    return state
}

export const resetNotification = () => {
    return {
        type: "RESET_NOTIFICATION"
    }
}

export const setNotification = (message, type) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(resetNotification())
        }, 10000)

        dispatch({
            type: "SET_NOTIFICATION",
            data: {
                message,
                type
            }
        })
    }
}

export default notificationReducer