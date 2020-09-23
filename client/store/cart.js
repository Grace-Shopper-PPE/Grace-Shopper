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
const addToCart = newItem => ({type: ADD_NEW_TO_CART, newItem})

export const addItem = id => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', id)
    dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

// Increment cart
const INCREMENT_CART = 'INCREMENT_CART'
const incrementCart = updatedItem => ({type: INCREMENT_CART, updatedItem})

export const incrementQuantity = item => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart', item)
    dispatch(incrementCart(data))
  } catch (error) {
    console.error(error)
  }
}

// decrement cart
const DECREMENT_CART = 'DECREMENT_CART'
const decrementCart = updatedItem => ({type: DECREMENT_CART, updatedItem})

export const decrementQuantity = item => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart', item)
    dispatch(decrementCart(data))
  } catch (error) {
    console.error(error)
  }
}

// delete from cart
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const deletedFromCart = removedItemId => ({
  type: DELETE_FROM_CART,
  removedItemId
})

export const deleteItem = id => async dispatch => {
  try {
    await axios.delete(`/api/cart/${id}`)
    dispatch(deletedFromCart(id))
  } catch (error) {
    console.error(error)
  }
}

// place order
const PLACE_ORDER = 'PLACE_ORDER'
const ordered = orderId => ({
  type: PLACE_ORDER,
  orderId
})

export const checkoutCart = cart => async dispatch => {
  try {
    const {data} = await axios.put('/api/order', cart)
    dispatch(ordered(data.id))
  } catch (error) {
    console.error(error)
  }
}

// place order with stripe
const NEW_STRIPE_SESSION = 'NEW_STRIPE_SESSION'
const openStripe = sessionId => ({
  type: NEW_STRIPE_SESSION,
  sessionId
})

export const stripeCheckout = cart => async dispatch => {
  try {
    const {data} = await axios.post('/api/order/checkout-session', {cart})
    dispatch(openStripe(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_NEW_TO_CART:
      return [...state, action.newItem]
    case INCREMENT_CART: {
      state.forEach(cartItem => {
        if (cartItem.productId === action.updatedItem.productId) {
          cartItem.quantity = cartItem.quantity + 1
        }
      })
      return state
    }
    case DECREMENT_CART: {
      state.forEach(cartItem => {
        if (cartItem.productId === action.updatedItem.productId) {
          cartItem.quantity = cartItem.quantity - 1
        }
      })
      return state
    }
    case DELETE_FROM_CART: {
      const newState = state.filter(
        cartItem => cartItem.productId !== action.removedItemId
      )
      return newState
    }
    case PLACE_ORDER:
      return initialState
    case NEW_STRIPE_SESSION:
      return action.sessionId
    default:
      return state
  }
}
