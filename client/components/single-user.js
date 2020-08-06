import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store'

/**
 * COMPONENT
 */
export class SingleUser extends Component {
  componentDidMount() {
    const id = this.props.match.params.userid
    this.props.loadSingleUser(id)
  }

  render() {
    const {firstName, lastName, email, address, phoneNumber} = this.props.user

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
const mapState = state => {
  return {user: state.currentUser}
}
const mapDispatch = dispatch => {
  return {
    loadSingleUser: id => dispatch(fetchSingleUser(id))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
