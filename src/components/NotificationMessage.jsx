const NotificationMessage = (props) => {
    if (props.message === null) {
        return
    }

    return (
        <div className={`notificationMessage ${props.process ? 'success' : 'error'}`}>
            { props.message }
        </div>
    )
}

export default NotificationMessage