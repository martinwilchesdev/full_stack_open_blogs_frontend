import axios from 'axios'

// helpers
import tokenHelper from '../helpers/token_helper'

const baseUrl = '/api/blogs'
let config = null

const getAll = async() => {
    config = tokenHelper.authToken()
    const response = await axios.get(baseUrl, config)

    return response.data
}

const create = async(newBlog) => {
    const response = await axios.post(baseUrl, newBlog, config)

    return response.data
}

const update = async(id, newBlog) => {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)

    return response.data
}

const deleteBlog = async(id) => {
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, deleteBlog }
