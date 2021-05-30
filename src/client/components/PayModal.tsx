import React from 'react'
import { Col, Modal, Row, Image, Button } from 'react-bootstrap'



const PayModal = ({ order, text, show, onHideHandler, image }: any) => {
  return (
    <Modal show={show} onHide={onHideHandler}>
      <Modal.Header closeButton>
        <Modal.Title>订单号：{order?._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>支付金额： ¥{order?.totalPrice}</p>
        <p>支付方式： {order?.paymentMethod}</p>
        <Row>
          <Col md={6} style={{ textAlign: 'center' }}>
            <Image src={image}></Image>
            <p
              style={{
                backgroundColor: '#00C800',
                color: 'white',
              }}
            >
              {text}
            </p>
          </Col>
          <Col>
            <Image src='/images/saoyisao.jpg' />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={onHideHandler}>
          关闭
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PayModal




