import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register, getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { getUserOrders } from '../actions/orderAction'

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

    const orderedRecords = useSelector(state => state.userOrders)
    const { loading:loadingOrders, error:errorOrders, orders } = orderedRecords

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if (!user || !user.name || success || userInfo.id !== Number(user.id)){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails(userInfo.id))
                dispatch(getUserOrders())
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
                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message variant='danger'>{ errorOrders }</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaied 
                                            ? order.paidAt 
                                            : ( <i className='fas fa-times' style={{ color: 'red'}}></i> )
                                        }</td>
                                    <td>
                                        <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>DETAILS</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>

        </Row>
    )
}

export default ProfileScreen
