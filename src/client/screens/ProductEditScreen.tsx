import axios from 'axios';
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
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state: State) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state: State) => state.productUpdate);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = productUpdate;

  const uploadFileHandler = async (e: any) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multerpart/form-data'
        }
      }
      const { data } = await axios.post('/api/upload/', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }

  }

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
        ???????????????
      </Link>
      <h1>??????????????????</h1>

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
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='?????????????????????'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='?????????????????????'
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='?????????????????????'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}></Form.Control>
                  <Form.File id='image-file' label='??????????????????' custom onChange={uploadFileHandler}></Form.File>
                  {uploading && <Loading />}
                </Form.Group>

                <Form.Group controlId='brand'>
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='???????????????'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='?????????????????????'
                    value={countInStock}
                    onChange={(e) => setCountInStock(+e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='?????????????????????'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>????????????:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='?????????????????????'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>????????????</Button>
              </Form>
            )
      }

    </FormContainer>
  )
}

export default ProductEditScreen
