import React from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import BlogForm from "./BlogForm"
import {Link} from "react-router-dom"
import {ListGroup, ListGroupItem, Badge} from "react-bootstrap"

const BlogList = ({blogs}) => {
    const sortedBlogs = blogs.sort((b1, b2) => {
        if (b1.likes === b2.likes) {
            return 0
        }

        return b1.likes < b2.likes ? 1 : -1
    })

    return (
        <ListGroup>
            <BlogForm />

            {sortedBlogs.map(blog => 
                <ListGroupItem key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>{blog.title} {blog.author}</Link>
                    <Badge>{blog.likes}</Badge>
                </ListGroupItem>
            )}  
        </ListGroup>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps
)(BlogList)