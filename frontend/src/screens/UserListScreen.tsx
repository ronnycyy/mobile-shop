import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { State } from '../models/State';
import { deleteUser, listUser } from '../redux/actions/user';

const UserListScreen: React.FunctionComponent<RouteComponentProps> = ({ history }) => {

  const dispatch = useDispatch();
  const userList = useSelector((state: State) => state.userList);
  const { loading, users, error } = userList;
  const userLogin = useSelector((state: State) => state.userLogin);
  const { user } = userLogin;
  const userDelete = useSelector((state: State) => state.userDelete);
  const { success: deleteSuccess } = userDelete;  // 重命名success，防止混淆

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listUser())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, user, deleteSuccess])
  // 增加deleteSuccess，一旦deleteSuccess更新，useEffect会重新调用，起到重刷用户列表的作用

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure to delete the user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>用户列表</h1>
      {
        loading ?
          <Loading /> :
          error ?
            <Message variant='danger'>{error}</Message> :
            (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>管理员</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {
                            user.isAdmin ?
                              (<i className='fas fa-check' style={{ color: '#00FF00' }}></i>) :
                              (<i className='fas fa-times' style={{ color: '#FF0000' }}></i>)
                          }
                        </td>
                        <td>
                          <LinkContainer to={`/admin/user/${user.id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.id)}>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            )
      }
    </>
  )
}

export default UserListScreen
