import React from 'react'

/**
 * COMPONENT
 */
const SingleProductDetail = props => {
  const {name, price, imageUrl} = props.product
  // const newPrice = (price / 100).toFixed(2)
  console.log(props.product)
  return (
    <div>
      <p>{name}</p>
      <p>${price}</p>
      <img src={imageUrl} alt={name} />
    </div>
  )
}

export default SingleProductDetail
