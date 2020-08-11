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
const LoginForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="login">
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
                type="email"
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
                type="password"
              />
            </InputGroup>
          </label>
        </div>
        <div>
          <Button type="submit">{displayName}</Button>{' '}
          <a href="/auth/google">{displayName} with Google</a>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  )
}

export default LoginForm
