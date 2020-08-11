/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserDetail from './user-detail'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserDetail', () => {
  let user = {
    id: 1,
    firstName: 'Cody',
    lastName: 'Dogo',
    email: 'cody@email.com'
  }
  let userDetail
  beforeEach(() => {
    userDetail = shallow(<UserDetail user={user} />)
  })

  it('renders a div with props from the user', () => {
    expect(userDetail.find('div').text()).to.be.include('cody@email.com')
    expect(userDetail.find('div').text()).to.be.include(1)
    expect(userDetail.find('div').text()).to.be.include('Cody')
    expect(userDetail.find('div').text()).to.be.include('Dogo')
  })
})
