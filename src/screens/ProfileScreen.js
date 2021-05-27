import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register, getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmpassword, setComfirmpassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if (!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('/account/profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != comfirmpassword) {
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({
                'id':user.id,
                'name':name,
                'email':email,
                'password':password
            }))
        }
        
    }


    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                <h1>Sign In</h1>
            { message && <Message variant='danger'>{message}</Message> }
            { error && <Message variant='danger'>{error}</Message> }
            { loading && <Loader/ >}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                    <Form.Control
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
                        type='password' 
                        placeholder='Comfirm Password'
                        value={comfirmpassword}
                        onChange={(e) => setComfirmpassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary' >
                    Update
                </Button>

            </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>

        </Row>
    )
}

export default ProfileScreen