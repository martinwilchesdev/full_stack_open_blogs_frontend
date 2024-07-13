import { useState, useEffect } from 'react'

// componentes
import NotificationMessage from './components/NotificationMessage'
import Login from './components/Login'
import Blog from './components/Blog'

// servicios
import loginService from './services/login.js'
import blogService from './services/blogs'

const App = () => {
    // lista de blogs
    const [blogs, setBlogs] = useState([])

    // credenciales de acceso y validacion de usuario autenticado
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem('loggedUserBlogsApp')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
        }
    }, [])

    useEffect(() => {
        if (user) blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [user])

    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            const user = await loginService.login(username, password)
            localStorage.setItem('loggedUserBlogsApp', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch(error) {
            console.log('Wrong Credentials')
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('loggedUserBlogsApp')
        setUser(null)
    }

    if (user) {
        return (
            <div>
                <h2>blogs</h2>
                <div>
                    <span>{user.name} logged in</span>
                    <button onClick={handleLogOut}>logout</button>
                </div>
                <br />
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        )
    } else {
        return(
            <Login
                onHandleUsername={setUsername}
                onHandlePassword={setPassword}
                onHandleLogin={handleLogin}
                username={username}
                password={password}
            />
        )
    }
}

export default App