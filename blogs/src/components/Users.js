import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Table} from "react-bootstrap"

const Users = ({users}) => {    
    return (
        <div>
            <h3>users</h3>

            <Table cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>blogs added</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => 
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.id}`}>
                                    {u.name}
                                </Link>
                            </td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(
    mapStateToProps
)(Users)