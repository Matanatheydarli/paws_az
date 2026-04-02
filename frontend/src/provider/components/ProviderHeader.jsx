export default function ProviderHeader({ activePage, setActivePage, unreadCount = 0 }) {
  const titles = {
    dashboard:     { title: 'Dashboard',         sub: 'Welcome back, Nigar!' },
    bookings:      { title: 'Booking Management', sub: 'Manage all your booking requests' },
    services:      { title: 'My Services',        sub: 'Manage the services you offer' },
    schedule:      { title: 'Schedule',           sub: 'Set your availability and working hours' },
    analytics:     { title: 'Analytics',          sub: 'Your performance overview' },
    notifications: { title: 'Notifications',      sub: 'Stay up to date with your bookings' },
    profile:       { title: 'Profile Settings',   sub: 'Manage your business information' },
  }

  const current = titles[activePage] || titles.dashboard

  return (
    <header className="pr-header">
      <div className="pr-header-left">
        <h2>{current.title}</h2>
        <p>{current.sub}</p>
      </div>
      <div className="pr-header-right">
        <button
          className="pr-header-icon-btn"
          onClick={() => setActivePage('notifications')}
          title="Notifications"
        >
          🔔
          {unreadCount > 0 && <span className="pr-notif-dot" />}
        </button>
        <div className="pr-header-avatar">👩‍⚕️</div>
      </div>
    </header>
  )
}