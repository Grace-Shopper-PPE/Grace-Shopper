import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavItem, NavLink} from 'react-bootstrap'
import {cartNav} from './local-cart'

const Navbar = ({handleClick, isLoggedIn}) => {
  const total = cartNav()
  console.log(total)
  return (
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
                  <NavLink href="/profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/cart" className="cart-nav">
                    Cart (<span>{total}</span>)
                  </NavLink>
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
              <NavItem>
                <NavLink href="/cart" className="cart-nav">
                  Cart (<span>{total}</span>)
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
            </Nav>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.currentUser.id
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
