import React from 'react'
import { shallow } from 'enzyme'
import Header from './index'

const setup = () => {
  return shallow(<Header />)
}

describe('Header component', () => {
  let component

  beforeEach(() => {
    component = setup()
  })

  it('Should render without errors', () => {
    const wrapper = component.find(`[data-test="header-component"]`)
    expect(wrapper.length).toBe(1)
  })

  it('Should have a link for the home page', () => {
    const [link] = component.find(`[data-test="home-link"]`)
    expect(link.props.to).toBe('/')
  })
})
