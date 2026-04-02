import NotificationItem from '../components/NotificationItem'

export default function ProviderNotifications({ notifications, setNotifications }) {
  const unread = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div>
      <div className="pr-page-header">
        <div className="pr-page-header-left">
          <h1>Notifications</h1>
          <p>{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        {unread > 0 && (
          <button className="pr-btn pr-btn-outline pr-btn-lg" onClick={markAllRead}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="pr-card">
        <div className="pr-card-body" style={{ padding: '8px 24px' }}>
          {notifications.length === 0 && (
            <div className="pr-empty">
              <div className="pr-empty-icon">🔔</div>
              <h4>No notifications</h4>
              <p>You are all caught up!</p>
            </div>
          )}
          {notifications.map((n) => (
            <div key={n.id} onClick={() => markRead(n.id)} style={{ cursor: 'pointer' }}>
              <NotificationItem notif={n} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}