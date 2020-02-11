import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Header = props => {
  return (
    <div className='header-component'>
      <div className='logo'>
        <Link to='/'>Readable</Link>
      </div>
    </div>
  )
}

export default Header
