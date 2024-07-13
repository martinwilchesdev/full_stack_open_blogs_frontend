import axios from 'axios'

const baseurl = '/api/login'

const login = async(username, password) => {
    const response = await axios.post(baseurl, { username, password })

    return response.data
}

export default { login }