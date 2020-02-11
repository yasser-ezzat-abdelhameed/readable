import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from '../Home'
import PostDetails from '../PostDetails'
import PostForm from '../PostForm'
import PageNotFound from '../PageNotFound'
import Header from '../Header'
import Footer from '../Footer'
import { handleReceiveCategories } from '../../actions/categories'
import './styles.css'

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(handleReceiveCategories())
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter data-test='app-component'>
      <Header />
      <Switch>
        <Route path="/" exact render={ () => <Home /> } />
        <Route path="/add-new-post" exact render={ () => <PostForm /> } />
        <Route path="/404" exact render={ () => <PageNotFound /> } />
        <Route path="/:categoryId" exact render={ () => <Home /> } />
        <Route path="/:categoryId/:postId" exact render={ () => <PostDetails /> } />
        <Route path="/:categoryId/:postId/edit" exact render={ () => <PostForm /> } />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

const ConnectedApp = connect()(App)

export default ConnectedApp
