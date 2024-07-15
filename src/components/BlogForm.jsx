const BlogForm = (props) => {
    const handleUrl = ({ target }) => props.onHandleUrl(target.value)
    const handleTitle = ({ target }) => props.onHandleTitle(target.value)
    const handleAuthor = ({ target }) => props.onHandleAuthor(target.value)

    return(
        <form onSubmit={props.onHandleCreateBlog}>
            <div>
                <label>title:</label>
                <input onChange={handleTitle} value={props.title} />
            </div>
            <div>
                <label>author:</label>
                <input onChange={handleAuthor} value={props.author} />
            </div>
            <div>
                <label>url:</label>
                <input onChange={handleUrl} value={props.url} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm