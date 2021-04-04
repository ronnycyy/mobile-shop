import React from 'react'
import { Alert } from 'react-bootstrap'
import MessageParams from '../models/Message'

const Message = ({ variant, children }: MessageParams) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info'
}

export default Message
