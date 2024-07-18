import { useState } from 'react'

import blogService from '../services/blogs'

const BlogForm = (props) => {
    // contenido de blog
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleUrl = ({ target }) => setUrl(target.value)
    const handleTitle = ({ target }) => setTitle(target.value)
    const handleAuthor = ({ target }) => setAuthor(target.value)

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const responseBlogs = await blogService.create({ title, author, url })

            props.onhandleBlogFormVisibility()

            setUrl('')
            setTitle('')
            setAuthor('')

            const newBlog = {
                ...responseBlogs,
                user: {
                    username: props.user.username,
                    name: props.user.name,
                    id: props.user.userid
                }
            }

            props.onHandleSetBlogs(props.blogs.concat(newBlog))
            props.onHandleNotificationMessage(true, `a new blog ${title} by ${author} added`)
        } catch (error) {
            props.onHandleNotificationMessage(false, error.message)
        }
    }

    return(
        <form onSubmit={handleCreateBlog}>
            <div>
                <label>title:</label>
                <input onChange={handleTitle} value={title} />
            </div>
            <div>
                <label>author:</label>
                <input onChange={handleAuthor} value={author} />
            </div>
            <div>
                <label>url:</label>
                <input onChange={handleUrl} value={url} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm