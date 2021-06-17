import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen({ match, history }) {

    const productId = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const [uploading, setUploading] = useState(false);


    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: updateLoading, success: updateSuccess, error: updateError } = productUpdate;

    useEffect(() => {

        if (updateSuccess){
            dispatch({type: PRODUCT_UPDATE_RESET});
            history.push('/admin/products');
            
        }else{

            if (!product.name || product.id !== Number(productId)) {
                dispatch(listProductDetails(productId));
    
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setCountInStock(product.countInStock);
            }
        }


    }, [history, dispatch, product, productId, updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProduct({
            id: product.id,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }));
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('image', file);
        formData.append('product_id', productId);

        setUploading(true);

        

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('api/products/image/upload/', formData, config);
            setImage(data);

            setUploading(false);

        }catch {
            setUploading(false);
        }
    }


    return (
        <div>
            <Link to='/admin/products'>
                <Button variant='primary' className="mt-3">
                    Go Back
                </Button>
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

                { updateLoading && <Loader /> }
                { updateError && <Message variant='danger'> { updateError } </Message>}

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

                        <Form.Group controlId='price' className="mt-3">
                            <Form.Label>Price</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image' className="mt-3">
                            <Form.Label>Image</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id = 'image-file'
                                    lable = 'Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>

                                { uploading && <Loader /> }

                        </Form.Group>

                        <Form.Group controlId='brand' className="mt-3">
                            <Form.Label>Brand</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category' className="mt-3">
                            <Form.Label>Category</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countinStock' className="mt-3">
                            <Form.Label>Stock</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className="mt-3">
                            <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
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

export default ProductEditScreen
