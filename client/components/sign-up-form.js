import React from 'react'
import Button from 'react-bootstrap/Button'
import {Form, Col} from 'react-bootstrap'
/**
 * COMPONENT
 */
const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="sign-up">
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first"
              placeholder="Enter a first name"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last"
              placeholder="Enter a last name"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter a valid email"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password should be least 6 characters"
            />
          </Form.Group>
        </Form.Row>

        <div>
          <Button type="submit">{displayName}</Button>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  )
}

export default SignUpForm
