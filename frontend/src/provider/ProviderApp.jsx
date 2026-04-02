import { useState } from 'react'
import '../provider/provider.css'

import ProviderSidebar      from './components/ProviderSidebar'
import ProviderHeader       from './components/ProviderHeader'
import ProviderLogin        from './pages/ProviderLogin'
import ProviderRegister     from './pages/ProviderRegister'
import ProviderDashboard    from './pages/ProviderDashboard'
import ProviderBookings     from './pages/ProviderBookings'
import ProviderServices     from './pages/ProviderServices'
import ProviderSchedule     from './pages/ProviderSchedule'
import ProviderProfile      from './pages/ProviderProfile'
import ProviderNotifications from './pages/ProviderNotifications'
import ProviderAnalytics    from './pages/ProviderAnalytics'

import {
  MOCK_BOOKINGS,
  MOCK_SERVICES,
  MOCK_NOTIFICATIONS,
  MOCK_SCHEDULE,
} from './data/mockData'

export default function ProviderApp({ setPage }) {
  const [authPage,       setAuthPage]       = useState('login')
  const [loggedIn,       setLoggedIn]       = useState(false)
  const [activePage,     setActivePage]     = useState('dashboard')
  const [bookings,       setBookings]       = useState(MOCK_BOOKINGS)
  const [services,       setServices]       = useState(MOCK_SERVICES)
  const [notifications,  setNotifications]  = useState(MOCK_NOTIFICATIONS)
  const [schedule,       setSchedule]       = useState(MOCK_SCHEDULE)

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length
  const unreadCount  = notifications.filter((n) => !n.read).length

  // not logged in
  if (!loggedIn) {
    if (authPage === 'register') {
      return (
        <ProviderRegister
          onSubmit={() => setLoggedIn(true)}
          goLogin={() => setAuthPage('login')}
        />
      )
    }
    return (
      <ProviderLogin
        onLogin={() => setLoggedIn(true)}
        goRegister={() => setAuthPage('register')}
      />
    )
  }

  function renderPage() {
    if (activePage === 'dashboard')     return <ProviderDashboard    bookings={bookings} setBookings={setBookings} notifications={notifications} setActivePage={setActivePage} />
    if (activePage === 'bookings')      return <ProviderBookings     bookings={bookings} setBookings={setBookings} />
    if (activePage === 'services')      return <ProviderServices     services={services} setServices={setServices} />
    if (activePage === 'schedule')      return <ProviderSchedule     schedule={schedule} setSchedule={setSchedule} />
    if (activePage === 'analytics')     return <ProviderAnalytics    bookings={bookings} />
    if (activePage === 'notifications') return <ProviderNotifications notifications={notifications} setNotifications={setNotifications} />
    if (activePage === 'profile')       return <ProviderProfile />
    return null
  }

  return (
    <div className="pr-layout">
      <ProviderSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        setPage={setPage}
        pendingCount={pendingCount}
        unreadCount={unreadCount}
      />
      <div className="pr-main">
        <ProviderHeader
          activePage={activePage}
          setActivePage={setActivePage}
          unreadCount={unreadCount}
        />
        <div className="pr-page">
          {renderPage()}
        </div>
      </div>
    </div>
  )
}