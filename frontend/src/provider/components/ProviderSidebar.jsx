export default function ProviderSidebar({ activePage, setActivePage, setPage, pendingCount = 0, unreadCount = 0 }) {
  const navItems = [
    { id: 'dashboard',     icon: '📊', label: 'Dashboard' },
    { id: 'bookings',      icon: '📅', label: 'Bookings',      badge: pendingCount },
    { id: 'services',      icon: '🛠️', label: 'My Services' },
    { id: 'schedule',      icon: '🕐', label: 'Schedule' },
    { id: 'analytics',     icon: '📈', label: 'Analytics' },
    { id: 'notifications', icon: '🔔', label: 'Notifications',  badge: unreadCount },
    { id: 'profile',       icon: '⚙️', label: 'Profile Settings' },
  ]

  return (
    <aside className="pr-sidebar">
      <div className="pr-sidebar-logo">
        <div className="pr-sidebar-logo-icon">🐾</div>
        <div className="pr-sidebar-logo-text">
          <strong>Paws.az</strong>
          <span>Provider Panel</span>
        </div>
      </div>

      <div className="pr-sidebar-provider">
        <div className="pr-sidebar-avatar">👩‍⚕️</div>
        <div className="pr-sidebar-provider-info">
          <strong>Paws Vet Clinic</strong>
          <span>Veterinary</span>
        </div>
      </div>

      <p className="pr-sidebar-section-label">Main Menu</p>
      <nav className="pr-sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={'pr-sidebar-link' + (activePage === item.id ? ' active' : '')}
            onClick={() => setActivePage(item.id)}
          >
            <span className="pr-nav-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && (
              <span className="pr-sidebar-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="pr-sidebar-footer">
        <button className="pr-sidebar-back-btn" onClick={() => setPage('home')}>
          ← Back to Paws.az
        </button>
      </div>
    </aside>
  )
}