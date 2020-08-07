import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'

/**
 * COMPONENT
 */
export class SingleUser extends Component {
  componentDidMount() {
    // const id = this.props.match.params.userid
    this.props.me()
  }

  render() {
    const currentUser = this.props
    const {firstName, lastName, email, address, phoneNumber} = currentUser

    // const authorized = currentUser && (currentUser.isAdmin)
    // if (!authorized) return <div>Sorry you don't have authorization to view user information</div>

    return (
      <div>
        <h3>Single User Profile</h3>
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
const mapDispatch = {me}

export default connect(mapState, mapDispatch)(SingleUser)
