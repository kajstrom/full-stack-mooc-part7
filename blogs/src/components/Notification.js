import React from "react"
import {connect} from "react-redux"
import {Alert} from "react-bootstrap"

const Notification = ({notification}) => {
    if (notification === null) {
        return ""
    }

    const styling = notification.type === "error" ? "danger" : "info"

    return (
        <Alert bsStyle={styling}>
            {notification.message}
        </Alert>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default 
connect(
    mapStateToProps
)(Notification)