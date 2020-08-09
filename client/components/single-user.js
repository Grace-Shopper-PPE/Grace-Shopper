import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store'
import User from './user-page'

/**
 * COMPONENT
 */
export class SingleUser extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.fetchSingleUser(id)
  }

  render() {
    return (
      <div>
        <User />
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapDispatch = {fetchSingleUser}

export default connect(null, mapDispatch)(SingleUser)
