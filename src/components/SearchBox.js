import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword){
            history.push(`/?keyword=${keyword}&page=1`);
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                className='mr-sm-2 ml-sm-5'
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
            ></Form.Control>
            <Button
                className='p-2'
                type='submit'
                variant='outline-success'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox
