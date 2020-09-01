import axios from 'axios'
import history from '../history'
import {fetchCart} from './cart'

/**
 * ACTION TYPES
 */

const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'
const SET_CURRENT_USER = 'SET_CURRENT_USER'

/**
 * ACTION CREATORS
 */

const removeCurrentUser = () => ({type: REMOVE_CURRENT_USER})
const setCurrentUser = user => ({type: SET_CURRENT_USER, user})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    if (res.data) {
      dispatch(fetchCart())
    }
    dispatch(setCurrentUser(res.data || {}))
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
    return dispatch(setCurrentUser({error: authError}))
  }

  try {
    dispatch(setCurrentUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.delete('/auth/logout')
    dispatch(removeCurrentUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    case REMOVE_CURRENT_USER:
      return {}
    default:
      return state
  }
}
