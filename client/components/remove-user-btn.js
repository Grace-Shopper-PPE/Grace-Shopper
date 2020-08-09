import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeUser} from '../store/users'

/**
 * COMPONENT
 */
export class removeUserBtn extends Component {
  componentDidMount() {
    this.removeUserCallback = this.removeUserCallback.bind(this)
  }

  removeUserCallback() {
    const {removeUser, currentUser} = this.props
    removeUser(currentUser.id)
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.removeUserCallback}>
          Remove
        </button>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {removeUser}

export default connect(mapState, mapDispatch)(removeUserBtn)
