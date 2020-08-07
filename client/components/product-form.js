/* eslint-disable complexity */
import React from 'react'

function ProductForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="name">
          Name{!props.name ? <span className="warning">required</span> : ''}
        </label>
        <input type="text" name="name" />

        <label htmlFor="description">
          Description{!props.description ? (
            <span className="warning">required</span>
          ) : (
            ''
          )}
        </label>
        <input type="text" name="description" />

        <label htmlFor="price">
          Price{!props.price ? <span className="warning">required</span> : ''}
        </label>
        <input type="text" name="price" />

        <label htmlFor="quantity">
          Quantity{!props.quantity ? (
            <span className="warning">required</span>
          ) : (
            ''
          )}
        </label>
        <input type="text" name="quantity" />

        <label htmlFor="category">
          Category{!props.category ? (
            <span className="warning">required</span>
          ) : (
            ''
          )}
        </label>
        <input type="text" name="category" />

        <label htmlFor="color">Color</label>
        <input type="text" name="color" />

        <label htmlFor="size">Size</label>
        <input type="text" name="size" />

        <label htmlFor="vendor">Vendor</label>
        <input type="text" name="vendor" />

        <label htmlFor="sku">SKU</label>
        <input type="text" name="sku" />

        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductForm
