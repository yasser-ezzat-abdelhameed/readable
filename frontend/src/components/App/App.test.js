import React from 'react'
import { shallow } from 'enzyme'
import App from './index'
import createTestStore from '../../util/createTestStore'

const setup = () => {
  const store = createTestStore()
  // return shallow(<App />) // => use this for normal component
  return shallow(<App store={store} />).dive() // => use this for connected component which has no mapStateToPropsPassed in
  // return shallow(<App store={store} />).childAt(0).dive() // => use this for connected component which has mapStateToPropsPassed in
}

describe('App component', () => {
  let component

  beforeEach(() => {
    component = setup()
  })

  it('Should render without errors', () => {
    const wrapper = component.find(`[data-test="app-component"]`)
    expect(wrapper.length).toBe(1)
  })

  it('Should have the BrowserRouter component', () => {
    const wrapper = component.find(`BrowserRouter`)
    expect(wrapper.length).toBe(1)
  })

  it('Should have 6 routes', () => {
    const routes = component.find('Route')
    expect(routes.length).toBe(6)
    for (let { props: { path, exact, render } } of routes) {
      expect(path).not.toBeUndefined()
      expect(render).not.toBeUndefined()
      expect(exact).toBe(true)
    }
  })

  it('Should have a fallback route', () => {
    const fallback = component.find('Redirect')
    expect(fallback.length).toBe(1)
  })

  it('Should have a header', () => {
    const header = component.find(`[data-test="header"]`)
    expect(header.length).toBe(1)
  })

  it('Should have a footer', () => {
    const footer = component.find(`[data-test="footer"]`)
    expect(footer.length).toBe(1)
  })
})
