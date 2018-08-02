import blogService from "../services/blogs"
import {setNotification} from "./notification"

const blogsReducer = (state = [], action) => {
    switch(action.type) {
    case "GET_ALL_BLOGS":
        return action.data
    case "CREATE_BLOG":
        return state.concat(action.data)
    case "DELETE_BLOG":
        return state.filter(b => b._id !== action.data.id)
    case "LIKE_BLOG":
        return state.filter(b => b._id !== action.data._id).concat(action.data)
    case "COMMENT_BLOG":
        return state.filter(b => b._id !== action.data._id).concat(action.data)
    default:
    }

    return state
}

export const getAllBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()

            dispatch({
                type: "GET_ALL_BLOGS",
                data: blogs
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog)
    
            dispatch({
                type: "CREATE_BLOG",
                data: newBlog
            })

            setNotification(
              `a new blog "${newBlog.title}" by ${newBlog.author} added`,
              "success"
            )(dispatch)
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            await blogService.remove(id)

            dispatch({
                type: "DELETE_BLOG",
                data: {
                    id
                }
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const likes = blog.likes + 1
        const id = blog._id

        try {
            const blogToUpdate = {...blog, likes}

            const updatedBlog = await blogService.update(id, blogToUpdate)
            
            dispatch({
                type: "LIKE_BLOG",
                data: updatedBlog
            })            
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const commentBlog = (id, comment) => {
    return async (dispatch) => {
        try {
            const resp = await blogService.addComment(id, comment)
    
            dispatch({
                type: "COMMENT_BLOG",
                data: resp
            })
      
            setNotification(
              `comment '${comment}' added to blog '${resp.title}'`,
              "success"
            )(dispatch)
          } catch (error) {
            console.log(error)
        }
    }
}

export default blogsReducer