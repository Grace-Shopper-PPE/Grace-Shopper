import React from 'react'
import {Link} from 'react-router-dom'
import {SingleUser} from './single-user'

/**
 * COMPONENT
 */
const UserDetail = function(props) {
  const {id, firstName, lastName, email} = props.user
  return (
    <div>
      <a href={`users/${id}`}>
        {id} {firstName} {lastName} {email}
      </a>
    </div>
  )
}

export default UserDetail
