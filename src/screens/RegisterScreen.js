import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


function RegisterScreen({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmpassword, setComfirmpassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != comfirmpassword) {
            setMessage('Password do not match')
        }else{
            dispatch(register(name, email, password))
        }
        
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            { message && <Message variant='danger'>{message}</Message> }
            { error && <Message variant='danger'>{error}</Message> }
            { loading && <Loader/ >}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                    <Form.Control 
                        required
                        type='name' 
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control  
                        required
                        type='email' 
                        placeholder='abc123@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control  
                        required
                        type='password' 
                        placeholder='Please enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordComfirm'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control  
                        required
                        type='password' 
                        placeholder='Comfirm Password'
                        value={comfirmpassword}
                        onChange={(e) => setComfirmpassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary' >
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account 
                    ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
