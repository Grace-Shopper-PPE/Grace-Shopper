import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Button from 'react-bootstrap/Button'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Button variant="primary" size="lg">
        Large Button
      </Button> */}
    </div>
  )
}

export default App
