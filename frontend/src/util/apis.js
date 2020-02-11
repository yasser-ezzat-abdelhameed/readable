import axios from 'axios'

const ROOT_URL = "http://localhost:3001/"

const asyncRequest = async (method, uri, data) => {
  const configs = {
    headers: {
      'Authorization': 'whatever-you-want'
    }
  }
  return await axios[method](uri, data || configs, configs)
}

export const getPosts = async categoryId => {
  try {
    const uri = ROOT_URL + (categoryId ? `${categoryId}/` : "") + "posts"
    const { data } = await asyncRequest('get', uri)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const getPost = async id => {
  try {
    const uri = ROOT_URL + "posts/" + id
    const { data } = await asyncRequest('get', uri)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const getCategories = async () => {
  try {
    const uri = ROOT_URL + "categories"
    const { data: { categories: data } } = await asyncRequest('get', uri)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const deletePost = async id => {
  try {
    const uri = ROOT_URL + "posts/" + id
    const { data } = await asyncRequest('delete', uri)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const voteForPost = async (id, option) => {
  try {
    const uri = ROOT_URL + "posts/" + id
    const { data } = await asyncRequest('post', uri, { option })
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const editPost = async post => {
  try {
    const uri = ROOT_URL + "posts/" + post.id
    const { data } = await asyncRequest('put', uri, post)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const addPost = async post => {
  try {
    const uri = ROOT_URL + "posts"
    const now = new Date()
    post.timestamp = now.getTime()
    post.id = String(post.timestamp)
    const { data } = await asyncRequest('post', uri, post)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const getComments = async postId => {
  try {
    const uri = ROOT_URL + 'posts/' + postId + '/comments'
    const { data } = await asyncRequest('get', uri)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const voteForComment = async (id, option) => {
  try {
    const uri = ROOT_URL + "comments/" + id
    const { data } = await asyncRequest('post', uri, { option })
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const deleteComment = async id => {
  try {
    const uri = ROOT_URL + "comments/" + id
    const { data } = await asyncRequest('delete', uri)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const editComment = async comment => {
  try {
    const uri = ROOT_URL + "comments/" + comment.id
    const { data } = await asyncRequest('put', uri, comment)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const addComment = async comment => {
  try {
    const uri = ROOT_URL + "comments"
    const now = new Date()
    comment.timestamp = now.getTime()
    comment.id = String(comment.timestamp)
    const { data } = await asyncRequest('post', uri, comment)
    return {
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}
