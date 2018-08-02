import React from "react"
import PropTypes from "prop-types"
import Togglable from "./Togglable"
import {connect} from "react-redux"
import {login, logout} from "../reducers/login"

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        
        this.props.login(this.state.username, this.state.password)

        this.setState({username: "", password: ""})
    }

    render() {
        const {user, logout} = this.props

        return (
            <div>
                {user === null ?
                    <div>
                        <h3>Log in to application</h3>
                        <Togglable buttonLabel="login">
                            <form onSubmit={this.onSubmit}>
                                <div>
                                    <label>username</label>
                                    <input type="text" value={this.state.username} onChange={this.onChange} name="username" />
                                </div>
                                <div>
                                    <label>password</label>
                                    <input type="password" value={this.state.password} onChange={this.onChange} name="password" />
                                </div>
                                <input type="submit" value="login" />
                            </form>
                        </Togglable>
                    </div>
                    :
                    <p>
                        {user.name} logged in
                        <input type="button" value="logout" onClick={logout} />
                    </p>
                }
            </div>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func,
    logout: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    {login, logout}
)(LoginForm)