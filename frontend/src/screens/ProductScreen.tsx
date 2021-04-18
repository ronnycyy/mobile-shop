import React, { FormEvent, useEffect, useState } from 'react'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constant/product'
import { State } from '../models/State'
import { createProductReview, listProductDetails } from '../redux/actions/product'

const ProductScreen = ({ history, match }: any) => {
  const [count, setCount] = useState<number>(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state: State) => state.userLogin);
  const { user } = userLogin;

  const productDetails = useSelector((state: State) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector((state: State) => state.productCreateReview);
  const { loading: reviewLoading, error: reviewError, success: reviewSuccess } = productCreateReview;

  // 路由更新时调用。deps: [match]
  useEffect(() => {
    if (reviewSuccess) {
      setRating(0);
      setComment('');
    }

    if (
      !product?._id ||
      product?._id !== match.params.id ||
      reviewSuccess
    ) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }


  }, [dispatch, match, reviewSuccess, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?count=${count}`);
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  }

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>返回商城</Link>

      {
        loading ? <Loading /> : error ? <Message variant='danger' children={error} /> :
          (
            <>
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
              <Row>
                <Col md={6}>
                  <h2>评论</h2>
                  {product && product?.reviews?.length === 0 && <Message>没有评论</Message>}
                  <ListGroup variant='flush'>
                    {
                      product?.reviews?.map((review: any) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} text='' />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))
                    }
                    <ListGroup.Item>
                      <h2>创建评论</h2>

                      {reviewLoading && <Loading></Loading>}

                      {reviewError && (<Message variant='danger'>{reviewError}</Message>)}

                      {
                        user ?
                          (
                            <Form onSubmit={submitHandler}>
                              <Form.Group>
                                <Form.Label>评分:</Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e: any) => setRating(e.target.value)}>
                                  <option value=''>选择评分...</option>
                                  <option value='1'>1 - 非常不满意</option>
                                  <option value='2'>2 - 不满意</option>
                                  <option value='3'>3 - 一般</option>
                                  <option value='4'>4 - 满意</option>
                                  <option value='5'>5 - 非常满意</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId='comment'>
                                <Form.Control as='textarea' rows={3} value={comment} onChange={(e: any) => setComment(e.target.value)}></Form.Control>
                              </Form.Group>
                              <Button type='submit' variant='primary'>
                                提交评论
                              </Button>
                            </Form>
                          ) :
                          (
                            <Message>
                              请<Link to='/login'>登录</Link>后再添加评论
                            </Message>
                          )
                      }
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )
      }

    </>
  )
}

export default ProductScreen
