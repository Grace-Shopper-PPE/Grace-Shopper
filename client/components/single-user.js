import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser, removeUser} from '../store/single-user'
import User from './user-page'

/**
 * COMPONENT
 */
export class SingleUser extends Component {
  constructor() {
    super()
    this.removeCallBack = this.removeCallBack.bind(this)
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.fetchSingleUser(id)
  }

  async removeCallBack(id) {
    await this.props.removeUser(id)
    this.props.history.push('/users')
  }

  render() {
    const {user} = this.props
    // console.log(this.props.currentUser)
    return (
      <div>
        <User user={user} />
        <button type="submit" onClick={() => updateUser(user.id)}>
          Update User
        </button>
        <button type="submit" onClick={() => this.removeCallBack(user.id)}>
          Remove User
        </button>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
/**
 * CONTAINER
 */
const mapState = ({currentUser, user}) => ({currentUser, user})
const mapDispatch = {fetchSingleUser, removeUser}

export default connect(mapState, mapDispatch)(SingleUser)
