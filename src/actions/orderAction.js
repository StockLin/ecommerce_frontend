import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,

    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

} from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'


export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type:ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/order/`,
            order,
            config
        )

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })

        dispatch({
            type:CART_CLEAR_ITEMS,
            payload:data
        })

        localStorage.removeItem('cartItems')

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/order/${id}/`,
            config
        )

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({
            type:ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/order/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type:ORDER_DELIVER_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/order/${order.id}/deliver/`,
            {},
            config
        )

        dispatch({
            type:ORDER_DELIVER_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_ORDERS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/order/list/`,
            config
        )

        dispatch({
            type: USER_ORDERS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_ORDERS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const getOrders = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDERS_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(
            `/api/order/admin/list/`,
            config
        );

        dispatch({
            type: ORDERS_SUCCESS,
            payload: data
        })

    }catch(error){

        dispatch({
            type:  ORDERS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}