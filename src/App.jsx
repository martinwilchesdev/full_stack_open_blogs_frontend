import { useState, useEffect } from 'react'

// componentes
import NotificationMessage from './components/NotificationMessage'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Blog from './components/Blog'

// servicios
import loginService from './services/login.js'
import blogService from './services/blogs'

const App = () => {
    const [successProcess, setSuccessProcess] = useState(false)
    const [notification, setNotification] = useState(null)

    // lista de blogs
    const [blogs, setBlogs] = useState([])

    // contenido de blog
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

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
            handleNotificationMessage(false, 'wrong username or password')
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('loggedUserBlogsApp')
        setUser(null)
    }

    const handleCreateBlog = async(event) => {
        event.preventDefault()

        try {
            const responseBlogs = await blogService.create({ title, author, url })

            setUrl('')
            setTitle('')
            setAuthor('')
            setBlogs(blogs.concat(responseBlogs))
            handleNotificationMessage(true, `a new blog ${title} by ${author} added`)
        } catch(error) {
            handleNotificationMessage(false, error.message)
        }
    }

    const handleNotificationMessage = (process, message) => {
        setSuccessProcess(process)
        setNotification(message)
        setTimeout(() => setNotification(null), 5000)
    }

    if (user) {
        return (
            <div>
                <h2>blogs</h2>
                <NotificationMessage
                    message={notification}
                    process={successProcess}
                />
                <div>
                    <span>{user.name} logged in</span>
                    <button onClick={handleLogOut}>logout</button>
                </div>
                <BlogForm
                    onHandleCreateBlog={handleCreateBlog}
                    onHandleAuthor={setAuthor}
                    onHandleTitle={setTitle}
                    onHandleUrl={setUrl}
                    author={author}
                    title={title}
                    url={url}
                />
                <br />
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        )
    } else {
        return(
            <Login
                successProcess={successProcess}
                onHandleUsername={setUsername}
                onHandlePassword={setPassword}
                onHandleLogin={handleLogin}
                notification={notification}
                username={username}
                password={password}
            />
        )
    }
}

export default App