import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {deleteBlog, likeBlog, commentBlog} from "../reducers/blogs"

class Blog extends React.Component {
    likeClickHandler = (e) => {
        e.preventDefault()
        this.props.likeBlog(this.props.blog)
    }

    removeClickHandler = (e) => {
        e.preventDefault()

        if (window.confirm(`delete '${this.props.blog.title}' by ${this.props.blog.author}`)) {
            this.props.deleteBlog(this.props.blog._id)
            this.props.history.push("/")
        }
    }

    commentHandler = (e) => {
        e.preventDefault()
        this.props.commentBlog(
            this.props.blog._id,
            e.target.comment.value
        )

        e.target.comment.value = ""
    }

    render() {
        const {blog, user} = this.props
        const currentUsername = user !== null ? user.name : ""

        if (blog === undefined) {
            return null
        }

        //Older entries in DB do not have a user specified.
        const addedBy = blog.user === undefined ? "Unknown" : blog.user.name

        return (
            <div className="blog-item-details">
                <h1>{blog.title} {blog.author}</h1>
                <p><a href="{blog.url}">{blog.url}</a></p>
                <p>{blog.likes} likes <button onClick={this.likeClickHandler}>like</button></p>
                <p>added by {addedBy}</p>
                {(blog.user === undefined || currentUsername === blog.user.username) ?
                    <button onClick={this.removeClickHandler}>delete</button>
                    : ""
                }

                <h3>comments</h3>

                <ul>
                    {blog.comments.map(c => 
                        <li key={c}>
                            {c}
                        </li>
                    )}
                </ul>
                
                <form onSubmit={this.commentHandler}>
                    <input name="comment" />
                    <button type="submit">add comment</button>
                </form>
            </div>
        )
    }
}

Blog.propTypes = {
    commentBlog: PropTypes.func,
    likeBlog: PropTypes.func,
    deleteBlog: PropTypes.func,
    history: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs.find(b => b._id === ownProps.id),
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    {deleteBlog, likeBlog, commentBlog}
)(Blog)