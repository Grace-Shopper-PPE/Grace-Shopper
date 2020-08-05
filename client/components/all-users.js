import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

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
              const {id, firstName, lastName, email} = user
              return (
                <ul key={id}>
                  {firstName} {lastName} {email}
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
