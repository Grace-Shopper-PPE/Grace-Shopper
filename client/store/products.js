import axios from 'axios'
const initialState = []

// All Products
const GET_PRODUCTS = 'GET_PRODUCTS'
const getProducts = products => ({type: GET_PRODUCTS, products})

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

// All Masks
const GET_MASKS = 'GET_MASKS'
const getMasks = products => ({type: GET_MASKS, products})

export const fetchMasks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/masks')
    dispatch(getMasks(data))
  } catch (error) {
    console.error(error)
  }
}

// All Faceshields
const GET_FACESHIELDS = 'GET_FACESHIELDS'
const getFaceshields = products => ({type: GET_FACESHIELDS, products})

export const fetchFaceshields = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/faceshields')
    dispatch(getFaceshields(data))
  } catch (error) {
    console.error(error)
  }
}

// All Sanitizers
const GET_SANITIZERS = 'GET_SANITIZERS'
const getSanitizers = products => ({type: GET_SANITIZERS, products})

export const fetchSanitizers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/sanitizers')
    dispatch(getSanitizers(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_MASKS:
      return action.products
    case GET_FACESHIELDS:
      return action.products
    case GET_SANITIZERS:
      return action.products
    default:
      return state
  }
}
