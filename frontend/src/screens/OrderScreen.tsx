import React, { useEffect, useState } from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import PayModal from '../components/PayModal';
import { State } from '../models/State';
import { getOrderById } from '../redux/actions/order';

const OrderScreen = ({ match }: any) => {

  const orderId = match.params.id;
  const dispatch = useDispatch();
  const addDecimals = (num: number) => num.toFixed(2);
  // const cart = useSelector((state: State) => state.cart);
  const orderDetails = useSelector((state: State) => state.orderDetails)
  const { loading, order, error } = orderDetails;
  const shippingAddress = order ? order.shippingAddress : null;
  const productsPrice = order ? addDecimals(order.orderItems.reduce<number>((pre, cur) => pre + cur.count * cur.price, 0)) : 0;

  // pay modal
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [text] = useState('请打开微信扫一扫支付');

  const onHideHandler = () => {
    setShow(false);
  }
  const goPayHandler = () => {
    setImage(`/images/wechat.jpg`)
    setShow(true);
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, order, dispatch])


  return (
    loading ?
      <Loading />
      :
      error ?
        <Message variant='danger'>{error}</Message>
        :
        <>
          <h1>订单号：{order?._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>收货地址</h2>
                  <p>
                    <strong>姓名：</strong>
                    {order?.user?.name}
                  </p>
                  <p>
                    <strong>收货地址: </strong>
                    {shippingAddress?.province},
                    {shippingAddress?.city},
                    {shippingAddress?.address}
                  </p>
                  <p>
                    <strong>邮政编码: </strong>
                    {shippingAddress?.postalCode}
                  </p>
                  <p>
                    <strong>邮箱：</strong>
                    <a href={`mailto:${order?.user?.email}`}>
                      {order?.user?.email}
                    </a>
                  </p>

                  {
                    order?.isDelivered ?
                      <Message variant='success'>已发货</Message>
                      :
                      <Message variant='danger'>未发货</Message>
                  }
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>支付方式</h2>
                  <p>
                    <strong>支付方法: </strong>
                    {order?.paymentMethod}
                  </p>

                  {
                    order?.isPaid ?
                      <Message variant='success'>已支付</Message>
                      :
                      <Message variant='danger'>待支付
                      </Message>
                  }
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>产品订单</h2>
                  {
                    order?.orderItems.length === 0 ?
                      <Message>购物车为空</Message>
                      :
                      <ListGroup variant='flush'>
                        {
                          order?.orderItems.map((item, index) =>
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={1}>
                                  <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col>
                                  <Link to={`/products/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={4}>
                                  {item.count} * {item.price} = ¥ {item.count * item.price}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )
                        }
                      </ListGroup>
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>确认账单</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>产品总价</Col>
                      <Col>
                        ¥ {productsPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>运费</Col>
                      <Col>
                        ¥ {addDecimals(order ? +order.shippingPrice : 0)}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>合计</Col>
                      <Col>
                        ¥ {addDecimals(order ? +order.totalPrice : 0)}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button type='button' className='btn-block' onClick={goPayHandler} disabled={order?.orderItems.length === 0}>
                      去支付
                    </Button>
                  </ListGroup.Item>
                  <PayModal show={show} order={order} text={text} image={image} onHideHandler={onHideHandler} />
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
  )
}

export default OrderScreen
