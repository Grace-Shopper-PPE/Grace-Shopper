import axios from 'axios'
import {UPDATE_USER} from './single-user'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
export const CREATE = 'CREATE_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
export const create = user => ({type: CREATE, user})
export const remove = id => ({type: REMOVE_USER, id})

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
    case REMOVE_USER:
      return users.filter(user => user.id !== action.id)
    case UPDATE_USER:
      return [...users].map(user => user === action.user)
    default:
      return users
  }
}
