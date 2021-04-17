import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constant/product';
import { State } from '../models/State';
import { listProductDetails, updateProduct } from '../redux/actions/product';

const ProductEditScreen = ({ match, history }: any) => {
  const productId = match.params.id;

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch();

  const productDetails = useSelector((state: State) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state: State) => state.productUpdate);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = productUpdate;

  useEffect(() => {

    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist');
    } else {
      if (!product?.name || product?._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }

  }, [dispatch, history, productId, product, updateSuccess]);


  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }))
  }

  return (
    <FormContainer>
      <Link to='/admin/productList' className='btn btn-dark my-3'>
        返回上一页
      </Link>
      <h1>编辑产品界面</h1>

      { updateLoading && <Loading />}
      { updateError && <Message variant='danger'>{updateError}</Message>}

      {
        loading ?
          <Loading /> :
          error ?
            <Message variant='danger'>{error}</Message> :
            (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>产品姓名:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='请输入产品名称'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>产品价格:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='请输入产品价格'
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>产品图片:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='请输入图片路径'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                  <Form.Label>产品品牌:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='请输入品牌'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>产品库存:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='请输入库存数量'
                    value={countInStock}
                    onChange={(e) => setCountInStock(+e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>产品分类:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='请输入产品分类'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>产品介绍:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='请输入产品介绍'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>更新信息</Button>
              </Form>
            )
      }

    </FormContainer>
  )
}

export default ProductEditScreen
