const authToken = () => {
    const loggedUserJSON = localStorage.getItem('loggedUserBlogsApp')
    const token = loggedUserJSON
        ? JSON.parse(loggedUserJSON)?.token
        : null

    return {
        headers: {
            Authorization: token || null
        }
    }
}

export default { authToken }