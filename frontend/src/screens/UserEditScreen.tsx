import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { State } from '../models/State';
import { getUserDetails } from '../redux/actions/user';

const UserEditScreen = ({ match, history }: any) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state: State) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user?.name || user?.id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin || false);
    }
   }, [userId, user, dispatch])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <FormContainer>
      <Link to='/admin/userList' className='btn btn-dark my-3'>返回上一页</Link>
      <h1>编辑用户界面</h1>
      {
        loading ?
          <Loading />
          :
          error ?
            <Message variant='danger'>{error}</Message>
            :
            (
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

                <Form.Group controlId='isAdmin'>
                  <Form.Check
                    type='checkbox'
                    label='is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>
                  </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>更新信息</Button>
              </Form>
            )
      }
    </FormContainer>
  )
}

export default UserEditScreen;
