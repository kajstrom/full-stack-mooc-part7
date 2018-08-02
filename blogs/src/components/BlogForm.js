import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {createBlog} from "../reducers/blogs"
import Togglable from "./Togglable"
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap"

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            author: "",
            url: ""
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addHandler = (e) => {
        e.preventDefault()
        this.props.createBlog(this.state)
        this.setState({
            title: "",
            author: "",
            url: ""
        })
    }

    render() {
        return (
            <Togglable buttonLabel="Add blog">
                <form onSubmit={this.addHandler}>
                    <FormGroup>
                        <ControlLabel>title</ControlLabel>
                        <FormControl
                            type="text"
                            name="title"
                            onChange={this.changeHandler}
                            value={this.state.title}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>author</ControlLabel>
                        <FormControl type="text" name="author" onChange={this.changeHandler} value={this.state.author} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>url</ControlLabel>
                        <FormControl type="text" name="url" onChange={this.changeHandler} value={this.state.url} />
                    </FormGroup>
                    <input type="submit" value="create" />
                </form>
            </Togglable>
        )
    }
}

BlogForm.propTypes = {
    createBlog: PropTypes.func
}

export default connect(
    null,
    {createBlog}
)(BlogForm)