import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>AlgoShop</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/account/profile'>
                                            <NavDropdown.Item>Prfole</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                                </LinkContainer>
                            )}

                            {
                                userInfo && userInfo.is_admin && (
                                    <NavDropdown title='Admin' id='adminmenu'>

                                        <LinkContainer to='/admin/users'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/products'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orders'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>

                                    </NavDropdown>
                                )
                            }
                            
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
