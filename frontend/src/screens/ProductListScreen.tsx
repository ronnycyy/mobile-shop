import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Product from '../models/Product';
import { State } from '../models/State';
import { listProducts } from '../redux/actions/product';

const ProductListScreen: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  console.log(111);
  
  const dispatch = useDispatch();
  const productList = useSelector((state: State) => state.productList);
  const { loading, error, products } = productList;
  const userLogin = useSelector((state: State) => state.userLogin);
  const { user } = userLogin;

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [user, history, dispatch]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) { }
  }

  const createHandler = () => { }

  return (
    <>
      <Row>
        <Col><h1>产品列表</h1></Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createHandler}>创建产品</Button>
        </Col>
      </Row>

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
                    <th>产品名称</th>
                    <th>价格</th>
                    <th>类型</th>
                    <th>品牌</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((p: Product) => (
                      <tr key={p._id}>
                        <td>{p._id}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.category}</td>
                        <td>{p.brand}</td>
                        <td>
                          <LinkContainer to={`/admin/product/${p._id}`}>
                            <Button variant='ligth' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(p._id)}>
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

export default ProductListScreen
