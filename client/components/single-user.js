import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/single-user'
import User from './user-page'
import {removeUser} from '../store/users'

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
    return (
      <div>
        <User user={user} removeCallBack={this.removeCallBack} />
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
const mapState = ({user}) => ({user})
const mapDispatch = {fetchSingleUser, removeUser}

export default connect(mapState, mapDispatch)(SingleUser)
