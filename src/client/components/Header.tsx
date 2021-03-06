import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom';
import { State } from '../models/State';
import { getUserDetails, logout } from '../redux/actions/user';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: State) => state.userLogin);
  const { user } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  const getUserDetailsHandler = () => {
    if (user) {
      dispatch(getUserDetails(user.id))
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>手机商城</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />

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
                      <LinkContainer to='/login'>
                        <NavDropdown.Item onClick={logoutHandler}>
                          退出
                      </NavDropdown.Item>
                      </LinkContainer>

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

              {
                user && user.isAdmin && (
                  <NavDropdown title='管理员操作' id='adminMenu'>
                    <LinkContainer to='/admin/userList'>
                      <NavDropdown.Item>用户列表</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/productList'>
                      <NavDropdown.Item>产品列表</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/orderList'>
                      <NavDropdown.Item>订单列表</NavDropdown.Item>
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
