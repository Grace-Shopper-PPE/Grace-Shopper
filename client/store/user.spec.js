/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout, fetchSingleUser} from './single-user'
import {fetchUsers} from './all-users'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })

  describe('get a single user', () => {
    let user = {
      id: 1,
      firstName: 'Cody',
      lastName: 'Dogo',
      email: 'cody@email.com',
      phoneNumber: '1-555-555-5555',
      address: '12 Cody Ln , New York, NY 10012',
      isAdmin: true
    }
    it('eventually dispatches the GET USER action', async () => {
      mockAxios.onGet(`/api/users/${user.id}`).replyOnce(200, user)
      await store.dispatch(fetchSingleUser())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(user)
    })
  })

  // it('returns a thunk to fetch usersfrom the backend and dispatch a SET_CAMPUSES action', async () => {
  //   mockAxios.onGet('/api/users').replyOnce(200, users);
  //   await store.dispatch(fetchCampuses());
  //   const actions = store.getActions();
  //   expect(actions[0].type).to.equal('SET_CAMPUSES');
  //   expect(actions[0].campuses).to.deep.equal(campuses);
  // })
})
