import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <Spinner
      animation='grow'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        color: 'lightblue'
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loading
