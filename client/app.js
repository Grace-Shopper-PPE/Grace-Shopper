import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

export default class App extends React.Component {
  render() {
    let localCart = localStorage.getItem('CART')
    if (!localCart) {
      localStorage.setItem('CART', JSON.stringify([]))
    }

    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}
