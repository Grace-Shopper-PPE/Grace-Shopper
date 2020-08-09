/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {render, containsMatchingElement} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProductPage} from './single-product-page'
// import {required} from 'react-router-dom'

const adapter = new Adapter()
enzyme.configure({adapter})

const match = {
  params: {
    baseId: 1 //any id you want to set
  }
}

describe('SingleProductPage ', () => {
  let product = {
    id: 1,
    name: 'Red Mask',
    description: 'Stand out with this bright mask',
    price: 1000,
    imageUrl: 'https://designshack.net/wp-content/uploads/placeholder-image.png'
  }
  let singleProdPage
  beforeEach(() => {
    singleProdPage = render(
      <SingleProductPage match={match} singleProduct={product} />
    )
  })

  it('renders an h3 with the header `Single Product Page`', () => {
    expect(singleProdPage.find('h3').text()).to.be.include(
      'Welcome to a single product page'
    )
  })

  it('renders a div with props from the singlProduct prop', () => {
    expect(singleProdPage.find('div').text()).to.be.include('Red Mask')
    expect(singleProdPage.find('div').text()).to.be.include(1)
    expect(singleProdPage.find('div').text()).to.be.include(
      'Stand out with this bright mask'
    )
    expect(singleProdPage.find('div').text()).to.be.include(
      (product.price / 100).toFixed(2)
    )
  })

  it('Contains a link to the product edit page', () => {
    expect(singleProdPage.hasClass('edit'))
  })
})
