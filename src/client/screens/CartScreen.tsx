import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { State } from '../models/State';
import { addToCart, removeFromCart } from '../redux/actions/cart';

const CartScreen = ({ match, location, history }: any) => {
  const productId = match.params.id;
  const count = location.search ? +location.search.split('=')[1] : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state: State) => state.cart);

  // 进入购物车页面有两种情况：一是点击购物车图标，二是点击产品详情页的加入购物车
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, count))
    }
  }, [dispatch, productId, count])

  const removeItemFromCart = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const goPay = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>购物车</h1>
        {
          cart.cartItems.length === 0 ?
            (
              <Message variant='info'>
                购物车空空如也...
                <Link to='/' className='mx-4'>返回主页</Link>
              </Message>
            ) :
            (
              <ListGroup variant='flush'>
                {
                  cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded></Image>
                        </Col>
                        <Col md={3}>
                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>¥{item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as='select'
                            value={item.count}
                            onChange={(e) => dispatch(addToCart(item.product, +e.target.value))}>
                            {
                              [...Array(item.countInStock).keys()].map((i) =>
                                (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))
                            }
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button type='button' onClick={() => removeItemFromCart(item.product)}>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>共计({cart.cartItems.reduce<number>((pre, cur) => pre + cur.count, 0)})个产品</h2>
              ¥{cart.cartItems.reduce<number>((pre, cur) => pre + cur.count * cur.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cart.cartItems.length === 0}
                onClick={goPay}>
                去支付
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
