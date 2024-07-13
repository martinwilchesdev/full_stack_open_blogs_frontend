import axios from 'axios'

// helpers
import tokenHelper from '../helpers/token_helper'

const baseUrl = '/api/blogs'

const getAll = async() => {
  const config = tokenHelper.authToken()
  const response = await axios.get(baseUrl, config)

  return response.data
}

export default { getAll }