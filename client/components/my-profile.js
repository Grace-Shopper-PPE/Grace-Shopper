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
    const admin = currentUser.isAdmin === true

    return (
      <>
        {admin ? (
          <div>
            <Profile />
            <Link to="/users">View All Users</Link>
            <p>
              <Link to="/products">View All Products</Link>
            </p>
          </div>
        ) : (
          <div>
            <Profile />
            <p>
              <Link to="/products">View All Products</Link>
            </p>
          </div>
        )}
      </>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {me}

export default connect(mapState, mapDispatch)(MyProfile)
