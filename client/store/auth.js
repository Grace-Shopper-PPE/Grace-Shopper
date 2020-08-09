import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ME = 'GET_ME'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getMe = user => ({type: GET_ME, user})

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

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getMe(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

export const auth = (
  email,
  password,
  firstName = null,
  lastName = null,
  method
) => async dispatch => {
  let res
  try {
    if (method === 'signup') {
      res = await axios.post(`/auth/${method}`, {
        email,
        password,
        firstName,
        lastName
      })
    } else {
      res = await axios.post(`/auth/${method}`, {email, password})
    }
  } catch (authError) {
    return dispatch(getMe({error: authError}))
  }

  try {
    dispatch(getMe(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_ME:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
