import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { handleReceivePosts, receivePosts, sortPosts } from '../../actions/posts'
import CategoriesMenu from './CategoriesMenu'
import SortingControls from './SortingControls'
import Post from '../Post'
import './styles.css'

const Home = ({ dispatch, posts }) => {
  const { categoryId } = useParams()
  const [activeSortingType, setActiveSortingType] = useState("none")

  useEffect(() => {
    dispatch(handleReceivePosts(categoryId))
    return () => {
      setActiveSortingType("none")
      dispatch(receivePosts([]))
    }
    // eslint-disable-next-line
  }, [categoryId])

  const handleSorting = (type, val) => {
    setActiveSortingType(type)
    dispatch(sortPosts({ type, val }))
  }

  return (
    <div className='home-component'>
      <CategoriesMenu categoryId={categoryId} />
      <div className='home-content'>
        <SortingControls activeSortingType={activeSortingType} handleSorting={handleSorting} />
        <div className='home-posts-container'>
          {
            posts.map((post, index) => <Post key={index} {...post} viewLink={true} wrappedBody={true} />)
          }
        </div>
      </div>
      <Link className='add-new-post-btn' to='/add-new-post'>
        <i className='fa fa-plus' />
      </Link>
    </div>
  )
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts,
    categories
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome
