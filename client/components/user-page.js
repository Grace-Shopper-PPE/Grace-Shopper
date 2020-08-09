import React, {Component} from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class User extends Component {
  render() {
    const {currentUser} = this.props
    const {firstName, lastName, email, address, phoneNumber} = currentUser
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
}
/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})

export default connect(mapState)(User)
