import {combineReducers, createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import notification from "./reducers/notification"
import users from "./reducers/users"
import blogs from "./reducers/blogs"
import login from "./reducers/login"

const reducer = combineReducers({
    notification,
    users,
    blogs,
    user: login
})

export default createStore(
    reducer,
    applyMiddleware(thunk))