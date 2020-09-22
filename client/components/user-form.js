/* eslint-disable complexity */
import React from 'react'
import Button from 'react-bootstrap/Button'

function Userform(props) {
  const {
    handleSubmit,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    handleChange
  } = props

  return (
    <form
      onSubmit={handleSubmit}
      // style={{ textAlign: "center" }}
    >
      <label>First Name: </label>
      <p>
        <input
          name="firstName"
          value={firstName}
          onChange={handleChange}
          type="text"
          required
          placeholder="Required"
        />
      </p>

      <label>Last Name:</label>
      <p>
        <input
          name="lastName"
          value={lastName}
          onChange={handleChange}
          type="text"
          required
          placeholder="Required"
        />
      </p>

      <label>Email:</label>
      <p>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
          placeholder="Required"
        />
      </p>

      <label>Password(must be at least 6 characters):</label>
      <p>
        <input
          name="password"
          type="password"
          required
          placeholder="Required"
        />
      </p>

      <label>Address:</label>
      <p>
        <input
          name="address"
          value={address}
          onChange={handleChange}
          type="address"
          required
          placeholder="Required"
        />
      </p>

      <label>Phone Number:</label>
      <p>
        <input
          value={phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          type="phoneNumber"
          required
          placeholder="Required"
        />
      </p>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default Userform
