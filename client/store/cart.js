import axios from 'axios'
const initialState = []

// load Products
const GET_CART = 'GET_CART'
const getCart = cart => ({type: GET_CART, cart})

export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCart(data))
  } catch (error) {
    console.error(error)
  }
}

// Add to cart
const ADD_NEW_TO_CART = 'ADD_NEW_TO_CART'
const addToCart = cart => ({type: ADD_NEW_TO_CART, cart})

export const addItem = item => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', item)
    dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

// Increment cart
const INCREMENT_CART = 'INCREMENT_CART'
const incrementCart = cart => ({type: INCREMENT_CART, cart})

export const incrementQuantity = item => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', item)
    dispatch(incrementCart(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return
    default:
      return state
  }
}
