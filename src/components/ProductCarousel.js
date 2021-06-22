import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopRatedProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated);
    const { loading, products, error } = productTopRated;

    useEffect(() => {
        dispatch(listTopRatedProducts());

    }, [dispatch]);

    return (
        loading 
        ? <Loader />
        : error 
            ? <Message variant='danger'> { error } </Message>
            : (
                <Carousel className='bg-dark' pause='hover'>
                    {products.map((product) => (
                        <Carousel.Item key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    )
}

export default ProductCarousel
