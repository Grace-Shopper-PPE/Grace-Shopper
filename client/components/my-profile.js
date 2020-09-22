import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import Profile from './profile-page'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class MyProfile extends Component {
  componentDidMount() {
    this.props.me()
  }

  render() {
    const {currentUser} = this.props

    return <Profile currentUser={currentUser} />
  }
}
/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {me}

export default connect(mapState, mapDispatch)(MyProfile)
