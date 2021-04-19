import React, { FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }: any) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e: any) => setKeyword(e.target.value)}
        placeholder='搜索产品...'
        className='mr-sm-2 ml-sm-5'></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        搜索
      </Button>
    </Form>
  )
}

export default SearchBox
