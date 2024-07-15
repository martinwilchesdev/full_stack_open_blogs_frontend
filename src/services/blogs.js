import axios from 'axios'

// helpers
import tokenHelper from '../helpers/token_helper'

const baseUrl = '/api/blogs'
const config = tokenHelper.authToken()

const getAll = async() => {
  const response = await axios.get(baseUrl, config)

  return response.data
}

const create = async(newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

export default { getAll, create }