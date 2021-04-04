import React, { useEffect, useState } from 'react'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { State } from '../models/State'
import { listProductDetails } from '../redux/actions/product'

const ProductScreen = ({ history, match }: any) => {
  const [count, setCount] = useState<number>(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state: State) => state.productDetails);
  const { loading, error, product } = productDetails;

  // 路由更新时调用。deps: [match]
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?count=${count}`);
  }

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>返回商城</Link>

      {
        loading ? <Loading /> : error ? <Message variant='danger' children={error} /> :
          (
            <Row>
              <Col md={6}>
                <Image src={product?.image} alt={product?.name} fluid></Image>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product?.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product?.rating ? product.rating : 0} text={`${product?.numReviews}条评论`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    价格：¥{product?.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    描述：{product?.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>价格：</Col>
                        <Col>
                          <strong>¥{product?.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>库存：</Col>
                        <Col>
                          {product?.countInStock && product.countInStock > 0 ? '有货' : '没货'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>购买数量：</Col>
                        <Col>
                          <Form.Control as='select' value={count} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(+e.target.value)}>
                            {
                              [...Array(product?.countInStock).keys()]
                                .map((i) => i + 1)
                                .map((i) => (
                                  <option key={i} value={i}>{i}</option>
                                ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn-block'
                        disabled={product?.countInStock === 0}
                        onClick={addToCartHandler}>
                        添加到购物车
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )
      }

    </>
  )
}

export default ProductScreen
