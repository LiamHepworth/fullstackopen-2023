const Notification = ({message}) => {
    return ( 
        <div className="notification-container">
            <span className="notification-text">{message}</span>
        </div>
     );
}
 
export default Notification;