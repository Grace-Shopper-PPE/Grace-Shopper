import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavItem, NavLink} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Grace Shopper PPE </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* <Link to="/home">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/products/masks">Masks</Link>
          <Link to="/products/faceshields">Face Shields</Link>
          <Link to="/products/sanitizers">Sanitizers</Link> */}

          <Nav variant="tabs" activeKey="/home">
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="link-1" href="/products">
                All Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="link-2" href="/products/masks">
                Masks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="link-3" href="/products/faceshields">
                Face Shields
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="link-4" href="/products/sanitizers">
                Sanitizers
              </NavLink>
            </NavItem>
            <Nav className="justify-content-end">
              <NavItem>
                <NavLink href="/home">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={handleClick}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Nav>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/products/masks">Masks</Link>
          <Link to="/products/faceshields">Face Shields</Link>
          <Link to="/products/sanitizers">Sanitizers</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
