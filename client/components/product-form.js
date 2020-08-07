/* eslint-disable complexity */
import React from 'react'

function ProductForm(props) {
  console.log(props)
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="name">
          Name{!props.name ? <span className="warning">required</span> : ''}
        </label>
        <input
          type="text"
          name="name"
          value={props.name || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="description">
          Description{!props.description ? (
            <span className="warning">required</span>
          ) : (
            ''
          )}
        </label>
        <input
          type="text"
          name="description"
          value={props.description || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="price">
          Price{!props.price ? <span className="warning">required</span> : ''}
        </label>
        <input
          type="text"
          name="price"
          value={props.price || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="color">Color</label>
        <input
          type="text"
          name="color"
          value={props.color || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="size">Size</label>
        <input
          type="text"
          name="size"
          value={props.size || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="category">
          Category{!props.category ? (
            <span className="warning">required</span>
          ) : (
            ''
          )}
        </label>
        <input
          type="text"
          name="category"
          value={props.category || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="quantity">
          Quantity{!props.quantity ? (
            <span className="warning">required</span>
          ) : (
            ''
          )}
        </label>
        <input
          type="text"
          name="quantity"
          value={props.quantity || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="vendor">Vendor</label>
        <input
          type="text"
          name="vendor"
          value={props.vendor || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="sku">SKU</label>
        <input
          type="text"
          name="sku"
          value={props.sku || ''}
          onChange={props.handleChange}
        />

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={props.imageUrl || ''}
          onChange={props.handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProductForm
