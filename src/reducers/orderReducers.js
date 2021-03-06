import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    USER_ORDERS_RESET,

    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success:true,
                order:action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error:action.payload
            }

        case ORDER_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const orderDetailsReducer = (state={loading:true, orderItems:[], shippingAddress:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order:action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error:action.payload
            }

        default:
            return state
    }
}

export const orderPayReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error:action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

export const orderDeliverReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error:action.payload
            }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}

export const userOrdersReducer = (state={orders:[]}, action) => {
    switch (action.type) {
        case USER_ORDERS_REQUEST:
            return {
                loading: true
            }
        case USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case USER_ORDERS_FAIL:
            return {
                loading: false,
                error:action.payload
            }

        case USER_ORDERS_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}

export const ordersReducer = (state={ orders: [] }, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return { loading: true }

        case ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDERS_FAIL:
            return {
                loading: false,
                error:action.payload
            }

        default:
            return state
    }
}
