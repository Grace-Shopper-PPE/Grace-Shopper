import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'
import UserDetail from './user-detail'

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const {users, currentUser} = this.props

    return (
      <div>
        <h3>All Users</h3>
        {!currentUser.isAdmin
          ? `Sorry you don't have authorization to view user information`
          : !users && !users.length
            ? `No users`
            : users.map(user => {
                const {id} = user
                return (
                  <ul key={id}>
                    <UserDetail user={user} />
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
const mapState = state => {
  return {
    users: state.users,
    currentUser: state.currentUser
  }
}
const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
