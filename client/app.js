import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
// import { me } from './store'
// import { connect } from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <Routes />
      </div>
    )
  }
}

// const mapState = ({ currentUser }) => ({ currentUser })

// const mapDispatch = dispatch => ({
//   loadInitialData: () => {
//     dispatch(me())
//   }
// })

// export default connect(mapState, mapDispatch)(App)
