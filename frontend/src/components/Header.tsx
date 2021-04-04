import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { State } from '../models/State';
import { getUserDetails, logout } from '../redux/actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: State) => state.userLogin);
  const { user } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }

  const getUserDetailsHandler = () => {
    dispatch(getUserDetails())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Ronny的商城</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>购物车
                </Nav.Link>
              </LinkContainer>

              {
                user ?
                  (
                    <NavDropdown title={user.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item onClick={getUserDetailsHandler}>个人详情</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        退出
                      </NavDropdown.Item>
                    </NavDropdown>
                  )
                  :
                  (
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-user"></i>登录
                      </Nav.Link>
                    </LinkContainer>
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
