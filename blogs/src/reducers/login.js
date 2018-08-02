import loginService from "../services/login"
import blogService from "../services/blogs"
import {setNotification} from "./notification"

const loginReducer = (state = null, action) => {
    switch(action.type) {
    case "USER_LOGGED_IN":
        return action.data
    case "INIT_LOGGED_IN_USER":
        return action.data
    case "USER_LOGGED_OUT":
        return null
    default:
    }

    return state
}

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
              username,
              password
            })
      
            window.localStorage.setItem("loggedInUser", JSON.stringify(user))
            blogService.setToken(user.token)
            
            dispatch({
                type: "USER_LOGGED_IN",
                data: user
            })

          } catch (exception) {
            setNotification(
                "wrong username or password",
                "error"
            )(dispatch)
          }
    }
}

export const logout = () => {
    window.localStorage.removeItem("loggedInUser")

    return {
        type: "USER_LOGGED_OUT"
    }
}

export const initLoggedInUser = () => {
    let user = window.localStorage.getItem("loggedInUser")
    if (user) {
        user = JSON.parse(user)
        blogService.setToken(user.token)
    } else {
        user = null
    }

    return {
        type: "INIT_LOGGED_IN_USER",
        data: user
    }
}

export default loginReducer