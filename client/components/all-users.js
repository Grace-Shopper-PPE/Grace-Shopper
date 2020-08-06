import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/all-users'
import UserDetail from './user-detail'

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const {users} = this.props

    return (
      <div>
        <h3>All Users</h3>
        {users && users.length
          ? users.map(user => {
              const {id} = user
              return (
                <ul>
                  <UserDetail key={id} user={user} />
                </ul>
              )
            })
          : 'No User'}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {users: state.users}
}
const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
