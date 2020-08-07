import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {Form, Col, Row} from 'react-bootstrap'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  if (name === 'login') {
    return (
      <div>
        <Form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <InputGroup className="mb-3" name="email">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Email"
                  aria-label="email"
                  name="email"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <InputGroup className="mb-3" name="password">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">+</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Password"
                  aria-label="password"
                  name="password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </label>
          </div>
          <div>
            <Button type="submit">{displayName}</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  } else {
    return (
      <div>
        <Form onSubmit={handleSubmit} name={name}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first" placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last" placeholder="Last Name" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
          </Form.Row>

          {/* <form onSubmit={handleSubmit} name={name}>
      <div>
          <label htmlFor="first">
            <small>First Name</small>
          </label>
          <input name="first" type="text" />
        </div>
        <div>
        <div>
          <label htmlFor="last">
            <small>Last Name </small>
          </label>
          <input name="last" type="text" />
        </div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div> */}
          <div>
            <Button type="submit">{displayName}</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
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
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
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
