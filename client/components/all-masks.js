import React from 'react'
import {connect} from 'react-redux'
import {fetchMasks} from '../store/products'

/**
 * COMPONENT
 */
export class AllMasks extends React.Component {
  componentDidMount() {
    this.props.getMasks()
  }

  render() {
    return (
      <div>
        <h3>Welcome to the mask page</h3>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getMasks: () => dispatch(fetchMasks())
})

export default connect(null, mapDispatch)(AllMasks)
