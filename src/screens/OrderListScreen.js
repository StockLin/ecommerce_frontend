import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrders } from '../actions/orderAction'


function OrderListScreen( { history } ) {

    const dispatch = useDispatch();
    
    const orderList = useSelector(state => state.orders);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.is_admin) {
            dispatch(getOrders());

        }else{
            history.push('/login')
        }

    }, [dispatch, history, userInfo]);


    return (
        <div>
            <h1>Orders</h1>
            { loading 
                ? <Loader/>
                : error
                    ? <Message variant='danger'> { error } </Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>DATE</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{ order.user && order.user.name  }</td>
                                        <td>{ order.createdAt.substring(0, 10) }</td>
                                        <td> ${ order.totalPrice } </td>
                                        <td>
                                            { 
                                                order.isPaied 
                                                ? ( order.paidAt.substring(0, 10) )
                                                : ( <i className='fas fa-check' style={{ color: 'red' }}></i> )
                                            }
                                        </td>
                                        <td>
                                            { 
                                                order.isDelivered 
                                                ? ( order.deliverAt.substring(0, 10) )
                                                : ( <i className='fas fa-check' style={{ color: 'red' }}></i> )
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={ `/order/${order.id}` }>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }

        </div>
    )
}

export default OrderListScreen;
