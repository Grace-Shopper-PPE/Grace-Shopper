import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  AllMasks,
  AllFaceshields,
  AllSanitizers,
  AllUsers,
  SingleUser,
  SingleProductPage,
  ProductUpdate,
  Cart,
  MyProfile,
  ProductAdd
} from './components'
import {me} from './store'
import {fetchCart} from './store/cart'
/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    // const {isLoggedIn} = this.props
    // console.log('props:', this.props)
    // if (isLoggedIn) {
    //   console.log('inside if')
    //   await this.props.loadCart()
    // } else {
    //   console.log('no user logged in')
    // }
    // kept in for now because if statement isnt working properly

  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/add" component={ProductAdd} />

        <Route exact path="/products/masks" component={AllMasks} />
        <Route exact path="/products/add" component={ProductAdd} />
        <Route exact path="/products/faceshields" component={AllFaceshields} />
        <Route exact path="/products/sanitizers" component={AllSanitizers} />
        <Route exact path="/products/:id" component={SingleProductPage} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn &&
          !isAdmin && (
            <>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={UserHome} />
              <Route exact path="/profile" component={MyProfile} />
            </>
          )}

        {isLoggedIn &&
          isAdmin && (
            <>
              {/* Routes placed here are only available for admins after logging in*/}
              <Route exact path="/" component={UserHome} />
              <Route exact path="/profile" component={MyProfile} />
              <Route exact path="/users" component={AllUsers} />
              <Route exact path="/users/:id" component={SingleUser} />
              <Route
                exact
                path="/products/:id/edit"
                component={ProductUpdate}
              />
            </>
          )}

        {/* Displays our Login component as a fallback */}
        <Route component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log(state.users)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // conerced to boolean from the id number
    isLoggedIn: !!state.currentUser.id,
    isAdmin: !!state.currentUser.isAdmin,
    cart: state.cart
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(me())
  },
  loadCart: () => dispatch(fetchCart())
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
