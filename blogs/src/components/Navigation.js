import React from "react"
import {Navbar, NavItem, Nav} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"

const Navigation = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                blogs
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to="/">
                    <NavItem>blogs</NavItem>
                </LinkContainer>
                <LinkContainer to="/users">
                    <NavItem>users</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default Navigation