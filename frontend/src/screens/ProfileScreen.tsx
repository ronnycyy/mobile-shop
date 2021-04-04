import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { State } from '../models/State'
import User from '../models/User'
import { getUserDetails, updateUserDetails } from '../redux/actions/user'

const ProfileScreen = ({ history }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state: State) => state.userDetails);
  const { loading, user, error, updated } = userDetails;

  const userLogin = useSelector((state: State) => state.userLogin);
  const loginUser = userLogin.user;

  useEffect(() => {
    if (!loginUser) {
      history.push('/login')
    } else {
      if (!user || (user && !user.name)) {
        if (!updated) dispatch(getUserDetails())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user, loginUser, updated]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUserDetails(user ? new User(user.id, name, email, user.token, password): null))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>个人资料  </h2>
        {!error && updated && <Message variant='success'>Update Success</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>用户名:</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入用户名'
              value={name}
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
          </Form.Group>`

        <Form.Group controlId='email'>
            <Form.Label>邮箱地址:</Form.Label>
            <Form.Control
              type='email'
              placeholder='请输入邮箱'
              value={email}
              onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>密码:</Form.Label>
            <Form.Control
              type='password'
              placeholder='请输入密码'
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>确认密码:</Form.Label>
            <Form.Control
              type='password'
              placeholder='请重复密码'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>更改资料</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>我的订单</h2>
      </Col>
    </Row>
  )

}

export default ProfileScreen;
