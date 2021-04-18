import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Order from '../models/Order';
import { State } from '../models/State';
import { listOrders } from '../redux/actions/order';

const OrderListScreen: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state: State) => state.orderList);
  const { loading, orders, error } = orderList;

  const loginUser = useSelector((state: State) => state.userLogin);
  const { user } = loginUser;

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, user])

  return (
    <>
      <h1>订单列表</h1>
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
                    <th>用户</th>
                    <th>下单日期</th>
                    <th>总价</th>
                    <th>支付状态</th>
                    <th>发货状态</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map((order: Order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt?.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {
                            order.isPaid ? (
                              order.paidAt?.substring(0, 10)
                            ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                              )
                          }
                        </td>
                        <td>
                          {
                            order.isDelivered ? (
                              order.deliveredAt?.substring(0, 10)
                            ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                              )
                          }
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                              查看订单
                            </Button>
                          </LinkContainer>
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

export default OrderListScreen
