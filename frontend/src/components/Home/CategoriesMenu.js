import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CategoriesMenu = props => {
  return (
    <div className='categories-menu-component'>
      <div>
        <Link to='/' className={!props.categoryId ? 'active' : ''}>All</Link>
        {
          props.categories.map(category => (
            <Link 
              to={`/${category.path}`}
              key={category.name}
              className={props.categoryId === category.path ? 'active' : ''}
            >
              {category.name}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ categories }) => ({
  categories: categories || []
})

const ConnectedCategoriesMenu = connect(mapStateToProps)(CategoriesMenu)

export default ConnectedCategoriesMenu
