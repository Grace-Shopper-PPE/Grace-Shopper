import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
export const REMOVE = 'REMOVE_USER'
const CREATE = 'CREATE_USER'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const remove = id => ({type: REMOVE, id})
export const create = user => ({type: CREATE, user})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (err) {
    console.error(`Retrieving users unsuccesful`, err)
  }
}

export const removeUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(remove(id))
  } catch (err) {
    console.error(`Removing user: ${id} unsuccesful`, err)
  }
}

export const addUser = user => async dispatch => {
  try {
    const {data} = await axios.post('/api/users', user)
    dispatch(create(data))
  } catch (err) {
    console.error(`Creating user: ${user} unsuccesful`, err)
  }
}

/**
 * REDUCER
 */
export default function(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case CREATE:
      return [action.user, ...users]
    case REMOVE:
      return users.filter(user => user.id !== action.id)
    default:
      return users
  }
}
