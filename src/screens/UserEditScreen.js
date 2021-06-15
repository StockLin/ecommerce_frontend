import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function EditUserScreen({ match, history }) {

    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: updateLoading, success: updateSuccess, error: updateError } = userUpdate

    useEffect(() => {

        if (updateSuccess) {
            dispatch({type: USER_UPDATE_RESET});
            history.push('/admin/users');
        } else {

            if (!user.name || user.id !== Number(userId)) {
                dispatch(getUserDetails(userId));
    
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.is_admin);
            }
        }

        

    }, [user, userId, updateSuccess, history])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateUser({id: user.id, name: name, email: email, is_admin: isAdmin}));
        
    }


    return (
        <div>
            <Link to='/admin/users'>
                <Button variant='primary' className="mt-3">
                    Go Back
                </Button>
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                { updateLoading && <Loader />}
                { updateError && <Message variant='danger'> { error } </Message>}
                { loading ? <Loader /> : error ? <Message variant='danger'> { error } </Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name' className="mt-3">
                            <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email' 
                                placeholder='abc123@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin' className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Check
                                type='checkbox' 
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary' className="mt-3">
                            Update
                        </Button>

                    </Form>
                )}
                

            </FormContainer>

        </div>
    )
}

export default EditUserScreen
