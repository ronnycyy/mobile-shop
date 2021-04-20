import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/product';
import { State } from '../models/State';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = ({ match }: any) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state: State) => state.productList);
  const { loading, products, error, page, pages } = productList;

  // 组件初始化时调用，deps为空数组
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])


  return <>
    <h1>最新产品</h1>

    {
      loading ? <Loading /> : error ? <Message variant='danger' children={error} /> :
        (
          <>
            <Row>
              {
                products.map((product: any) =>
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                  </Col>
                )
              }
            </Row>
            <Paginate page={page || 1} pages={pages || 1} keyword={keyword ? keyword : ''} isAdmin={false}/>
          </>
        )
    }

  </>
}

export default HomeScreen
