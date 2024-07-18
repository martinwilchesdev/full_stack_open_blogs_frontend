import { useState, useEffect, useRef } from 'react'

// componentes
import NotificationMessage from './components/NotificationMessage'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Blog from './components/Blog'

// servicios
import ToggleButton from './components/ToggleButton.jsx'
import loginService from './services/login.js'
import blogService from './services/blogs'

const App = () => {
    const [successProcess, setSuccessProcess] = useState(false)
    const [notification, setNotification] = useState(null)

    // lista de blogs
    const [blogs, setBlogs] = useState([])

    // credenciales de acceso y validacion de usuario autenticado
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    // visualizacion de la informacion del blog
    const [blogId, setBlogId] = useState(null)

    // referencia al componente que muestra/oculta el formulario de creacion de blogs
    const blogFormRef = useRef()

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

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login(username, password)
            localStorage.setItem('loggedUserBlogsApp', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            handleNotificationMessage(false, 'wrong username or password')
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('loggedUserBlogsApp')
        setBlogId(null)
        setUser(null)
    }

    const handleNotificationMessage = (process, message) => {
        setSuccessProcess(process)
        setNotification(message)
        setTimeout(() => setNotification(null), 5000)
    }

    const blogFormVisibility = () => {
        // uso del hook de referencia para manipular la visibilidad del formulario de creacion de blogs
        blogFormRef.current.toggleVisibility()
    }

    const handleViewInfoBlog = (id) => {
        id.toString() === blogId ? setBlogId(null) : setBlogId(id.toString())
    }

    const updateLikes = async(blog) => {
        blog.likes += 1
        const newBlog = {
            author: blog.author,
            likes: blog.likes,
            title: blog.title,
            url: blog.url,
        }

        try {
            const reponseBlogs = await blogService.update(blog.id, newBlog)
            setBlogs(blogs.filter(blog => blog.id === reponseBlogs.id ? reponseBlogs : blog))
        } catch(error) {
            console.log(error.message)
        }
    }

    const deleteBlog = async(deleteBlog) => {
        try {
            if (window.confirm(`Remove blog ${deleteBlog.title}`)) {
                await blogService.deleteBlog(deleteBlog.id)
                setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
            }
        } catch(error) {
            console.log(error.message)
        }
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
                <ToggleButton
                    ref={blogFormRef}
                    buttonLabel='create new blog'
                >
                    <BlogForm
                        onHandleNotificationMessage={handleNotificationMessage}
                        onhandleBlogFormVisibility={blogFormVisibility}
                        onHandleSetBlogs={setBlogs}
                        blogs={blogs}
                        user={user}
                    />
                </ToggleButton>
                <br />
                {blogs.map((blog) => (
                    <Blog
                        onHandleViewInfoBlog={() => handleViewInfoBlog(blog.id)}
                        blogId={blogId}
                        blog={blog}
                        key={blog.id}
                    >
                        {
                            blogId === blog.id.toString() &&
                                <div className='blogInfo'>
                                    <p>{blog.url}</p>
                                    <p><span>likes: {blog.likes}</span> <button onClick={() => updateLikes(blog)}>like</button></p>
                                    <p>{blog.user.name}</p>
                                    {user.userid === blog.user.id && <button onClick={() => deleteBlog(blog)}>delete</button>}
                                </div>
                        }
                    </Blog>
                ))}
            </div>
        )
    } else {
        return (
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