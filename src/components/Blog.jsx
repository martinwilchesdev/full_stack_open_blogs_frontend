const Blog = (props) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const buttonLabel = props.blogId === props.blog.id.toString() ? 'hide' : 'view'

    return (
        <>
            <div style={blogStyle}>
                <span>{props.blog.title} {props.blog.author}</span>
                <button onClick={props.onHandleViewInfoBlog}>{buttonLabel}</button>
            </div>
            {props.children}
        </>
    )
}
export default Blog
