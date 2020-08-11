import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeUser, fetchUsers} from '../store/users'
import UserDetail from './user-detail'

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {users, removeUser} = this.props

    return (
      <div>
        <h3>All Users</h3>
        {users.map(user => {
          const {id} = user
          return (
            <ul key={id}>
              <UserDetail user={user} />
              <button type="submit" onClick={() => removeUser(id)}>
                Remove User
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
const mapState = ({users}) => ({users})
const mapDispatch = {removeUser, fetchUsers}

export default connect(mapState, mapDispatch)(AllUsers)
