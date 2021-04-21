import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { State } from '../models/State';
import { listTopProducts } from '../redux/actions/product';
import Loading from './Loading';
import Message from './Message';

const ProductsCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state: State) => state.productTopRate);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    loading ?
      <Loading /> :
      error ?
        <Message variant='danger'>{error}</Message> :
        <Carousel pause='hover' className='bg-dark'>
          {
            products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className='carousel-caption'>
                    <h2>{product.name} ({product.price})</h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))
          }
        </Carousel>
  )


}

export default ProductsCarousel
