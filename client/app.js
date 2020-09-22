import React from 'react'
import Routes from './routes'

export default class App extends React.Component {
  render() {
    let localCart = localStorage.getItem('CART')
    if (!localCart) {
      localStorage.setItem('CART', JSON.stringify([]))
    }

    return (
      <div>
        <Routes />
      </div>
    )
  }
}
