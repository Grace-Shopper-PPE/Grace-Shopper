import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}
