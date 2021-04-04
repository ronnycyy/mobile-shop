import React, { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import ShippingAddress from '../models/ShippingAddress';
import { State } from '../models/State';
import { saveShippingAddress } from '../redux/actions/cart';

const ShippScreen: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const cart = useSelector((state: State) => state.cart)
  const { shippingAddress } = cart;

  const [province, setProvince] = useState(shippingAddress ? shippingAddress.province : '');
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');
  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : '');
  const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : '');

  const dispatch = useDispatch();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress(new ShippingAddress(province, city, address, postalCode)));
    history.push('/payment');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>收货地址</h1>

      <Form onSubmit={submitHandler}>

        <Form.Group controlId='province'>
          <Form.Label>省份</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入所在省份'
            value={province}
            onChange={(e) => setProvince(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>城市</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入所在城市'
            value={city}
            onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>详细地址</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入详细地址'
            value={address}
            onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>邮政编码</Form.Label>
          <Form.Control
            type='text'
            placeholder='请输入邮政编码'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>下一步</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippScreen
