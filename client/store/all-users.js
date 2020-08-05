import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const allUsers = function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}

export default allUsers
