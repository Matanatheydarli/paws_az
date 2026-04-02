export default function NotificationItem({ notif }) {
  return (
    <div className={'pr-notif-item' + (!notif.read ? ' pr-notif-unread' : '')}>
      <div className="pr-notif-icon-wrap">{notif.icon}</div>
      <div className="pr-notif-body">
        <p>{notif.message}</p>
        <span>{notif.time}</span>
      </div>
      {!notif.read && <div className="pr-notif-dot-indicator" />}
    </div>
  )
}