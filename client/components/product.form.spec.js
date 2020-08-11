/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductForm from './product-form'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductForm', () => {
  let productForm
  beforeEach(() => {
    productForm = shallow(<ProductForm />)
  })

  it('Renders a form in a div', () => {
    expect(productForm.find('div').text()).to.be.contain('Submit')
  })
})
