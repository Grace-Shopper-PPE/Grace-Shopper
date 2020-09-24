import axios from 'axios'
const initialState = ''

const PLACE_ORDER = 'PLACE_ORDER'
const orderStatus = status => ({
  type: PLACE_ORDER,
  status
})

export const runStripe = (total, token) => async dispatch => {
  try {
    const {data} = await axios.post('/api/order', {total, token})
    dispatch(orderStatus(data.status))
  } catch (error) {
    console.error(error)
  }
}

const CLEAR_INVENTORY = 'CLEAR_INVENTORY'
const reduceInventory = () => ({
  type: PLACE_ORDER
})

export const updateInventory = cart => async dispatch => {
  try {
    const {data} = await axios.post('/api/order/complete', {cart})
    dispatch(reduceInventory(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLACE_ORDER:
      return action.status
    case CLEAR_INVENTORY:
      return initialState
    default:
      return state
  }
}
