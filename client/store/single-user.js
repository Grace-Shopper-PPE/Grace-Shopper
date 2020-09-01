import axios from 'axios'
import {REMOVE_USER, CREATE} from './users'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const fetchSingleUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(getUser(data))
  } catch (err) {
    console.log(`Retrieving user: ${id} unsuccesful`, err)
  }
}

export const updateSingleUser = (id, user) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, user)
    dispatch(updateUser(data))
  } catch (err) {
    console.log(`Retrieving user: ${id} unsuccesful`, err)
  }
}

/**
 * REDUCER
 */
export default function(defaultUser = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case CREATE:
      return action.user
    case REMOVE_USER:
      return {}
    case UPDATE_USER:
      return action.user
    default:
      return defaultUser
  }
}
