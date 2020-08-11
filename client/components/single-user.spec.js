/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleUser} from './single-user'

const adapter = new Adapter()
enzyme.configure({adapter})

const match = {
  params: {
    baseId: 1 //any id you want to set
  }
}

describe('SingleUser', () => {
  let user = {
    id: 1,
    firstName: 'Cody',
    lastName: 'Dogo',
    email: 'cody@email.com',
    phoneNumber: '1-555-555-5555',
    address: '12 Cody Ln , New York, NY 10012',
    isAdmin: true
  }
  let singleUser
  beforeEach(() => {
    singleUser = render(<SingleUser match={match} user={user} />)
  })

  it('renders an h3 with the header `Single User Profile`', () => {
    expect(singleUser.find('h3').text()).to.be.include('Single User Profile')
  })

  it('renders a div with props from the user with p elements', () => {
    expect(singleUser.find('p').text()).to.be.include('cody@email.com')
    expect(singleUser.find('p').text()).to.be.include(1)
    expect(singleUser.find('p').text()).to.be.include('Cody')
    expect(singleUser.find('p').text()).to.be.include('Dogo')
    expect(singleUser.find('p').text()).to.be.include('1-555-555-5555')
    expect(singleUser.find('p').text()).to.be.include(
      '12 Cody Ln , New York, NY 10012'
    )
  })
})
