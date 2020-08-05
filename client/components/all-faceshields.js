import React from 'react'
import {connect} from 'react-redux'
import {fetchFaceshields} from '../store/products'

/**
 * COMPONENT
 */
export class AllFaceshields extends React.Component {
  componentDidMount() {
    this.props.getFaceshields()
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
  getFaceshields: () => dispatch(fetchFaceshields())
})

export default connect(null, mapDispatch)(AllFaceshields)
