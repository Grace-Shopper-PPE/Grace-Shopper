import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Nav, NavItem, NavLink} from 'react-bootstrap'

const Navbar = props => {
  const {isLoggedIn, handleClick, cart, currentUser} = props

  if (isLoggedIn) {
    let total = cart.reduce((accum, item) => accum + item.quantity, 0)
    document.querySelector('.cart-nav span').textContent = total
  }
  // else {
  // figure out how to update cart quantity when page loads
  // }

  return (
    <div>
      <h1>PPEbay</h1>
      <nav>
        {isLoggedIn && currentUser.isAdmin === false ? (
          <div>
            <Nav variant="tabs" activeKey="/">
              <NavItem>
                <NavLink href="/">Home</NavLink>
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
                    Cart (<span>0</span>)
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
        ) : isLoggedIn && currentUser.isAdmin === true ? (
          <div>
            <Nav variant="tabs" activeKey="/">
              <NavItem>
                <NavLink href="/">Home</NavLink>
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
              {/* <Nav className="justify-content-end"> */}
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/cart" className="cart-nav">
                  Cart (<span>0</span>)
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users">All Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={handleClick}>
                  Logout
                </NavLink>
              </NavItem>
              {/* </Nav> */}
            </Nav>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Nav variant="tabs" activeKey="/home">
              <NavItem>
                <NavLink href="/">Home</NavLink>
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
                  Cart (<span>0</span>)
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
    isLoggedIn: !!state.currentUser.id,
    cart: state.cart,
    currentUser: state.currentUser
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
