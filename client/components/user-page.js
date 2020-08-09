import React from 'react'

/**
 * COMPONENT
 */
export const User = props => {
  const {user} = props
  const {firstName, lastName, email, address, phoneNumber} = user
  return (
    <div>
      <h3>User Profile</h3>
      <p>
        {firstName} {lastName}
      </p>
      <p>{email}</p>
      <p>{address}</p>
      <p>{phoneNumber}</p>
    </div>
  )
}

export default User
