import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { State } from '../models/State'
import { login } from '../redux/actions/user'

const UserLoginScreen = ({ location, history }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state: State) => state.userLogin);
  const { loading, user, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  const dispatch = useDispatch();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [ history, user, redirect ])

  return (
    <FormContainer>
      <h1>登录</h1>
      { error && <Message variant='danger'>{ error }</Message> }
      { loading && <Loading /> }
      <Form onSubmit={submitHandler}>
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
        <Button type='submit' variant='primary'>登录</Button>
      </Form>
      <Row className='py-3'>
        <Col>
          新用户？
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>去注册</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default UserLoginScreen
