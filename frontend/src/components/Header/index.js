import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Header = props => {
  return (
    <div className='header-component' data-test='header-component'>
      <div className='logo'>
        <Link to='/' data-test='home-link'>Readable</Link>
      </div>
    </div>
  )
}

export default Header
