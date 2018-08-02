import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter as Router, Route} from "react-router-dom"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import {connect} from "react-redux"
import Users from "./components/Users"
import User from "./components/User"
import {getAllBlogs} from "./reducers/blogs"
import {getAllUsers} from "./reducers/users"
import {initLoggedInUser} from "./reducers/login"
import Navigation from "./components/Navigation"

class App extends React.Component {
    componentDidMount() {
        this.props.getAllBlogs()
        this.props.getAllUsers()
        this.props.initLoggedInUser()
    }

    render() {
        const home = () => {
            return (
                <div>
                    {this.props.user !== null ?
                        <BlogList />
                        : ""}
                </div>
            )
        }

        return (
            <div className="container">
                <Router>
                    <div>
                        <Navigation />
                        <Notification />
                        <LoginForm />

                        <Route exact path="/" render={home} />
                        <Route exact path="/blogs/:id" render={({match, history}) => 
                            <Blog 
                                id={match.params.id}
                                history={history}
                            />
                        } />
                        <Route exact path="/users" render={() => <Users />} />
                        <Route exact path="/users/:id" render={({match}) => 
                            <User id={match.params.id} />
                        }/>
                    </div>
                </Router>
            </div>
        )
    }
}

App.propTypes = {
    getAllBlogs: PropTypes.func,
    getAllUsers: PropTypes.func,
    initLoggedInUser: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    {getAllBlogs, getAllUsers, initLoggedInUser}
)(App)
