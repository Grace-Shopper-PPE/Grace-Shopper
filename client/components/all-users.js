import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, removeUser} from '../store/users'
import UserDetail from './user-detail'

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.removeUserCallback = this.removeUserCallback.bind(this)
  }

  removeUserCallback(event) {
    const {removeUser, currentUser} = this.props
    removeUser(currentUser.id)
  }

  render() {
    const {users, currentUser} = this.props
    const authorized = currentUser && currentUser.isAdmin
    if (!authorized)
      return (
        <div>Sorry you don't have authorization to view user information</div>
      )

    return (
      <div>
        <h3>All Users</h3>
        {users.map(user => {
          const {id} = user
          return (
            <ul key={id}>
              <UserDetail user={user} />
              <button type="submit" onClick={this.removeUserCallback}>
                Remove
              </button>
            </ul>
          )
        })}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = ({users, currentUser}) => ({users, currentUser})
const mapDispatch = {removeUser, fetchUsers}

export default connect(mapState, mapDispatch)(AllUsers)
