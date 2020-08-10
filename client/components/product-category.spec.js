/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {render, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const db = require('../../server/db')
const Product = db.model('product')

// import {required} from 'react-router-dom'

// Note that we are testing disconnected components which is why we are
// deconstructing the objects from each module instead of importing from components directory

import {AllFaceShields} from './all-faceshields'
import {AllMasks} from './all-masks'
import {AllSanitizers} from './all-sanitizers'
import {AllProducts} from './all-products'
import SingleProductDetail from './single-product-details'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Product Category Tests', () => {
  let faceMask, faceShield, sanitizer

  beforeEach(async () => {
    faceMask = await Product.create({
      id: 1,
      name: 'N95',
      category: 'mask',
      price: 1000
    })

    faceShield = await Product.create({
      id: 2,
      name: 'Rainbow Shield',
      category: 'face-shield',
      price: 10000
    })

    sanitizer = await Product.create({
      id: 3,
      name: 'Purell',
      category: 'sanitizer',
      price: 1200
    })
  })
  const products = [faceMask, faceShield, sanitizer]
  let allProds
  describe('All Products', () => {
    beforeEach(() => {
      allProds = render(<AllProducts products={products} />)
    })

    it('renders an h3 `Welcome to the product page`', () => {
      console.log(products)
      expect(allProds.find('div').text()).to.be.include(
        'Welcome to the product page'
      )
    })
  })
})
