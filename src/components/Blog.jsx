const Blog = (props) => {
    const buttonLabel = props.blogId === props.blog.id.toString() ? 'hide' : 'view'

    return (
        <>
            <div>
                <span>{props.blog.title} {props.blog.author}</span>
                <button onClick={props.onHandleViewInfoBlog}>{buttonLabel}</button>
            </div>
            {props.children}
        </>
    )
}
export default Blog
