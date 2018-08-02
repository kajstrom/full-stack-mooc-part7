import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

const User = ({user}) => {
    if (user === undefined) {
        return ""
    }

    return (
        <div>
            <h3>{user.name}</h3>

            <h4>Added blogs</h4>
            <ul>
                {user.blogs.map((b) => 
                    <li key={b._id}>
                        {b.title} by {b.author}
                    </li>
                )}
            </ul>
        </div>
    )
}

User.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users.find(u => u.id === ownProps.id)
    }
}

export default connect(
    mapStateToProps
)(User)