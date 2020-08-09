import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'
import UserDetail from './user-detail'
import removeUserBtn from './remove-user-btn'

/**
 * COMPONENT
 */
export class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {users} = this.props

    return (
      <div>
        <h3>All Users</h3>
        {users.map(user => {
          const {id} = user
          return (
            <ul key={id}>
              <UserDetail user={user} />
              <removeUserBtn />
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
const mapDispatch = {fetchUsers}

export default connect(mapState, mapDispatch)(AllUsers)
