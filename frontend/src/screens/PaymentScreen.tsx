import React, { FormEvent, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RouteChildrenProps } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { State } from '../models/State'
import { savePaymentMethod } from '../redux/actions/cart'

const PaymentScreen: React.FunctionComponent<RouteChildrenProps> = ({ history }) => {
  const cart = useSelector((state: State) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push('/shipping');  // 没有填写收货地址
  }

  const [paymentMethod, setPaymentMethod] = useState('weChat');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');  // 进入确认下单环节
  }


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>支付方式</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>选择支付方式</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='微信'
              id='weChat'
              name='paymentMethod'
              value='weChat'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>

            <Form.Check
              type='radio'
              label='PayPal'
              id='payPal'
              name='paymentMethod'
              value='PayPay'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>下一步</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
