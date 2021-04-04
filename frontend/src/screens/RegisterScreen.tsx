import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { State } from '../models/State'
import { register } from '../redux/actions/user'

const RegisterScreen = ({ location, history }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const userRegister = useSelector((state: State) => state.userRegister);
  const { loading, user, error } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('两次密码不匹配');
    } else {
      dispatch(register(name, email, password));
    }

  }

  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  return (
    <FormContainer>
      <h1>注册</h1>
      { message && <Message variant='danger'>{message}</Message>}
      { error && <Message variant='danger'>{error}</Message>}
      { loading && <Loading />}
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
        <Button type='submit' variant='primary'>注册</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          已有账号？
          <Link to={redirect ? ('/login?redirect=' + redirect) : '/login'}>去登录</Link>
        </Col>
      </Row>

    </FormContainer>
  )

}

export default RegisterScreen;
