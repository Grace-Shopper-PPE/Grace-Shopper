import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {fetchCart} from './store/cart'

export class App extends React.Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(App)
