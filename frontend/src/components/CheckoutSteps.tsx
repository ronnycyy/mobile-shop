import React from 'react'
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


interface ComponentProps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const CheckoutSteps: React.FunctionComponent<ComponentProps> = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item>
        {
          step1 ?
            (
              <LinkContainer to='/login'>
                <Nav.Link>登录</Nav.Link>
              </LinkContainer>
            ) :
            (
              <Nav.Link disabled>登录</Nav.Link>
            )
        }
      </Nav.Item>

      <Nav.Item>
        {
          step2 ?
            (
              <LinkContainer to='/shipping'>
                <Nav.Link>收货地址</Nav.Link>
              </LinkContainer>
            ) :
            (
              <Nav.Link disabled>收货地址</Nav.Link>
            )
        }
      </Nav.Item>

      <Nav.Item>
        {
          step3 ?
            (
              <LinkContainer to='/payment'>
                <Nav.Link>支付</Nav.Link>
              </LinkContainer>
            ) :
            (
              <Nav.Link disabled>支付</Nav.Link>
            )
        }
      </Nav.Item>

      <Nav.Item>
        {
          step4 ?
            (
              <LinkContainer to='/placeorder'>
                <Nav.Link>确认下单</Nav.Link>
              </LinkContainer>
            ) :
            (
              <Nav.Link disabled>确认下单</Nav.Link>
            )
        }
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps;