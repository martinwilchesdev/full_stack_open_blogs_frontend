import NotificationMessage from '../components/NotificationMessage'

const Login = (props) => {
    const handleUsername = ({ target }) => props.onHandleUsername(target.value)
    const handlePassword = ({ target }) => props.onHandlePassword(target.value)

    return(
        <div>
            <h2>log in to application</h2>
            <NotificationMessage />
            <form onSubmit={props.onHandleLogin}>
                <div>
                    <label>username:</label>
                    <input onChange={handleUsername} value={props.username} />
                </div>
                <div>
                    <label>password:</label>
                    <input onChange={handlePassword} value={props.password} type="password" />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login