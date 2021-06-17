import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailsReducer, 
    productDeleteReducer, 
    productCreateReducer ,
    productUpdateReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
    UserLoginReducer, 
    UserRegisterReducer, 
    UserDetailsReducer, 
    UserUpdateProfileReducer,
    UserListReducer,
    UserDeleteReducer,
    UserUpdateReducer
} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, userOrdersReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,

    cart: cartReducer,
    
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer,
    userUpdateProfile: UserUpdateProfileReducer,
    userList: UserListReducer,
    userDelete: UserDeleteReducer,
    userUpdate: UserUpdateReducer,
    
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userOrders: userOrdersReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
                                JSON.parse(localStorage.getItem('userInfo'))
                                : null

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                                JSON.parse(localStorage.getItem('cartItems'))
                                : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
                                JSON.parse(localStorage.getItem('shippingAddress'))
                                : {}

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store