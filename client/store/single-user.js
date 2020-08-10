import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const remove = id => ({type: REMOVE_USER, id})
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

export const removeUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(remove(id))
    history.push('/users')
  } catch (err) {
    console.error(`Removing user: ${id} unsuccesful`, err)
  }
}

/**
 * REDUCER
 */
export default function(defaultUser = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return defaultUser
  }
}
