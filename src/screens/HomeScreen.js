import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'


function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;
    let keyword = history.location.search;

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword])

    return (
        <div>
            { loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
            
        </div>
    )
}

export default HomeScreen
