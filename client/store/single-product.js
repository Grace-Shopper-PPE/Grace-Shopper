import axios from 'axios'
const initialState = {}

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

const DELETE_SINGLE_PRODUCT = 'DELETE_SINGLE_PRODUCT'
const deletedSingleProduct = () => ({
  type: DELETE_SINGLE_PRODUCT
})

export const deleteSingleProduct = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deletedSingleProduct())
  } catch (error) {
    console.error(error)
  }
}

const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT'
const updatedSingleProduct = (product, id) => ({
  type: UPDATE_SINGLE_PRODUCT,
  id,
  product
})

export const fetchUpdatedSingleProduct = (
  productId,
  product
) => async dispatch => {
  try {
    await axios.patch(`/api/products/${productId}`, product)
    dispatch(updatedSingleProduct(productId, product))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    case UPDATE_SINGLE_PRODUCT:
      return action.product
    case DELETE_SINGLE_PRODUCT:
      return state
    default:
      return state
  }
}
