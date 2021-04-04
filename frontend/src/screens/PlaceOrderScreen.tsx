import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Order from '../models/Order'
import { State } from '../models/State'
import { createOrder } from '../redux/actions/order'

const PlaceOrderScreen: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const cart = useSelector((state: State) => state.cart);
  const { shippingAddress } = cart;
  const addDecimals = (num: number) => {
    return num.toFixed(2);
  }
  const dispatch = useDispatch();

  const productsPrice = addDecimals(cart.cartItems.reduce<number>((pre, cur) => pre + cur.count * cur.price, 0));
  const transCost = addDecimals(+productsPrice > 5000 ? 0 : 20); // 邮费
  const totalPay = addDecimals(+productsPrice + (+transCost));

  // 提交订单
  const placeorderHandler = () => {
    const order = new Order(cart.cartItems, cart.shippingAddress, cart.paymentMethod, productsPrice, transCost, totalPay, '');

    dispatch(createOrder(order));
  }

  const orderCreate = useSelector((state: State) => state.orderState);
  const { order, error, success } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order?._id}`)
    }
  }, [history, order, success])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>收货地址</h2>
              <p>
                <strong>收件人地址: </strong>
                {shippingAddress?.province},
                {shippingAddress?.city},
                {shippingAddress?.address}
              </p>
              <p>
                <strong>邮政编码: </strong>
                {shippingAddress?.postalCode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>支付方式</h2>
              <strong>支付方法: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>产品订单</h2>
              {
                cart.cartItems.length === 0 ?
                  <Message>购物车为空</Message>
                  :
                  <ListGroup variant='flush'>
                    {
                      cart.cartItems.map((item, index) =>
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
                    ¥ {transCost}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>合计</Col>
                  <Col>
                    ¥ {totalPay}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button type='button' className='btn-block' onClick={placeorderHandler} disabled={cart.cartItems.length === 0}>
                  提交订单
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
