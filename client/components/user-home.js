import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HomeCarousel from './homepage-carousel'
import Trending from './trending'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="home-page">
      <div className="hp-items">
        <HomeCarousel email={email} />
        <Trending />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.currentUser.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
