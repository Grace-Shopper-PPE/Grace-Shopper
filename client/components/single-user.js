import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/single-user'

/**
 * COMPONENT
 */
export class SingleUser extends Component {
  componentDidMount() {
    this.props.loadSingleUser()
  }

  render() {
    const {
      id,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      isAdmin
    } = this.props

    return (
      <div>
        <h3>Single User Profile</h3>
        {id}
        <p>
          {firstName} {lastName}
        </p>
        <p>{email}</p>
        <p>{address}</p>
        <p>{phoneNumber}</p>
        <p>{isAdmin}</p>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {user: state.user}
}
const mapDispatch = dispatch => {
  return {
    loadSingleUser: () => dispatch(fetchSingleUser())
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
