import React from 'react'
import {connect} from 'react-redux'
import {fetchSanitizers} from '../store/products'

/**
 * COMPONENT
 */
export class AllSanitizers extends React.Component {
  componentDidMount() {
    this.props.getSanitizers()
  }

  render() {
    return (
      <div>
        <h3>Welcome to the faceshield page</h3>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getSanitizers: () => dispatch(fetchSanitizers())
})

export default connect(null, mapDispatch)(AllSanitizers)
