import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeUser, fetchUsers} from '../store/users'
import UserDetail from './user-detail'
import CardDeck from 'react-bootstrap/CardDeck'

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
        <CardDeck>
          {users.map(user => {
            const {id} = user
            return (
              <ul key={id}>
                <UserDetail
                  id={id}
                  user={user}
                  removeUser={this.props.removeUser}
                />
              </ul>
            )
          })}
        </CardDeck>
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
