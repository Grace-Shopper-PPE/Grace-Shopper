import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {fetchCart} from '../store/cart'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {Form, Col, Row} from 'react-bootstrap'
import LoginForm from './login-form'
import SignUpForm from './sign-up-form'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  if (name === 'login') {
    return <LoginForm {...props} />
  } else {
    return <SignUpForm {...props} />
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.currentUser.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.currentUser.error,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.first.value
        const lastName = evt.target.last.value
        dispatch(auth(email, password, firstName, lastName, formName))
        let localCart = localStorage.getItem('CART')
        if (localCart) {
          const cartArr = JSON.parse(localCart)
          // CREATE NEW CART FOR NEW USER
          // ADD items to new cart
          // remove items from local sotrage
        }
      } else {
        dispatch(auth(email, password, null, null, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

// const passwordCheck = evt.target.passwordcheck.value
// if(password === passwordCheck) {
// dispatch(auth(email, password, firstName, lastName, formName))
// }
// else {
//   console.log('does not match')
// }
