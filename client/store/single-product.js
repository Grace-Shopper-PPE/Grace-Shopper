import axios from 'axios'
const initialState = {}

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const fetchSingleProduct = productId => async dispatch => {
  try {
    console.log('fetching')
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
