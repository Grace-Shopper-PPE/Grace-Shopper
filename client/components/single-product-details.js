import React from 'react'

/**
 * COMPONENT
 */
const SingleProductDetail = props => {
  const {name, price, imageUrl} = props.product
  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <img src={imageUrl} alt={name} />
    </div>
  )
}

export default SingleProductDetail
