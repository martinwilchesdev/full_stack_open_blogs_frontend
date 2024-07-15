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
            console.log('Wrong Credentials')
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('loggedUserBlogsApp')
        setUser(null)
    }

    const handleCreateBlog = async(event) => {
        event.preventDefault()
        const responseBlogs = await blogService.create({ title, author, url })

        setUrl('')
        setTitle('')
        setAuthor('')
        setBlogs(blogs.concat(responseBlogs))
    }

    if (user) {
        return (
            <div>
                <h2>blogs</h2>
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