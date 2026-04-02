import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import BookingCard from '../components/BookingCard'
import NotificationItem from '../components/NotificationItem'
import StatusBadge from '../components/StatusBadge'

export default function ProviderDashboard({ bookings, setBookings, notifications, setActivePage }) {
  const [selectedBooking, setSelectedBooking] = useState(null)

  const pending   = bookings.filter((b) => b.status === 'Pending').length
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length
  const completed = bookings.filter((b) => b.status === 'Completed').length
  const total     = bookings.length

  const todayStr   = new Date().toISOString().split('T')[0]
  const todayCount = bookings.filter((b) => b.date === todayStr).length

  function updateStatus(id, status) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
  }

  const recentBookings = bookings.slice(0, 4)
  const recentNotifs   = notifications.slice(0, 4)

  return (
    <div>
      {/* stats */}
      <div className="pr-stats-grid">
        <StatsCard icon="📅" value={pending}   label="Pending Requests"  change="↑ 2 new today"    changeType="up" />
        <StatsCard icon="✅" value={confirmed}  label="Confirmed Today"   change={todayCount + ' today'} changeType="up" />
        <StatsCard icon="📊" value={total}      label="Total Bookings"    change="↑ 12% this month" changeType="up" />
        <StatsCard icon="🏆" value={completed}  label="Completed"         change="Great work!" changeType="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>

        {/* recent bookings */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px' }}>
              Recent Booking Requests
            </h3>
            <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={() => setActivePage('bookings')}>
              View all →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentBookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onClick={setSelectedBooking}
                onAccept={(id) => updateStatus(id, 'Confirmed')}
                onReject={(id) => updateStatus(id, 'Rejected')}
                onComplete={(id) => updateStatus(id, 'Completed')}
                onCancel={(id) => updateStatus(id, 'Cancelled')}
              />
            ))}
          </div>
        </div>

        {/* right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* quick actions */}
          <div className="pr-card">
            <div className="pr-card-header"><h3>Quick Actions</h3></div>
            <div className="pr-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="pr-btn pr-btn-primary" style={{ width: '100%' }} onClick={() => setActivePage('bookings')}>
                📅 View All Bookings
              </button>
              <button className="pr-btn pr-btn-outline" style={{ width: '100%' }} onClick={() => setActivePage('services')}>
                🛠️ Manage Services
              </button>
              <button className="pr-btn pr-btn-outline" style={{ width: '100%' }} onClick={() => setActivePage('schedule')}>
                🕐 Update Schedule
              </button>
              <button className="pr-btn pr-btn-outline" style={{ width: '100%' }} onClick={() => setActivePage('profile')}>
                ⚙️ Edit Profile
              </button>
            </div>
          </div>

          {/* recent notifications */}
          <div className="pr-card">
            <div className="pr-card-header">
              <h3>Recent Activity</h3>
              <button className="pr-btn pr-btn-outline pr-btn-sm" onClick={() => setActivePage('notifications')}>
                See all
              </button>
            </div>
            <div className="pr-card-body" style={{ padding: '8px 24px' }}>
              {recentNotifs.map((n) => (
                <NotificationItem key={n.id} notif={n} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* booking detail modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onAccept={(id) => { updateStatus(id, 'Confirmed'); setSelectedBooking((b) => ({ ...b, status: 'Confirmed' })) }}
          onReject={(id) => { updateStatus(id, 'Rejected');  setSelectedBooking((b) => ({ ...b, status: 'Rejected'  })) }}
          onComplete={(id) => { updateStatus(id, 'Completed'); setSelectedBooking((b) => ({ ...b, status: 'Completed' })) }}
          onCancel={(id) => { updateStatus(id, 'Cancelled');   setSelectedBooking((b) => ({ ...b, status: 'Cancelled' })) }}
        />
      )}
    </div>
  )
}

function BookingDetailModal({ booking, onClose, onAccept, onReject, onComplete, onCancel }) {
  return (
    <div className="pr-modal-overlay" onClick={onClose}>
      <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pr-modal-header">
          <h3>Booking {booking.id}</h3>
          <button className="pr-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pr-modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <StatusBadge status={booking.status} />
            <span style={{ fontSize: '13px', color: 'var(--pr-text-lt)' }}>Created {booking.createdAt}</span>
          </div>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pr-text-lt)', marginBottom: '10px' }}>Customer</h4>
          <div className="pr-detail-grid" style={{ marginBottom: '20px' }}>
            <div className="pr-detail-item"><label>Name</label><span>{booking.customerName}</span></div>
            <div className="pr-detail-item"><label>Phone</label><span>{booking.customerPhone}</span></div>
            <div className="pr-detail-item"><label>Email</label><span>{booking.customerEmail}</span></div>
          </div>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pr-text-lt)', marginBottom: '10px' }}>Pet</h4>
          <div className="pr-detail-grid" style={{ marginBottom: '20px' }}>
            <div className="pr-detail-item"><label>Pet Name</label><span>{booking.petName}</span></div>
            <div className="pr-detail-item"><label>Breed / Type</label><span>{booking.petType}</span></div>
            <div className="pr-detail-item"><label>Age</label><span>{booking.petAge}</span></div>
          </div>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pr-text-lt)', marginBottom: '10px' }}>Booking</h4>
          <div className="pr-detail-grid" style={{ marginBottom: '20px' }}>
            <div className="pr-detail-item"><label>Service</label><span>{booking.service}</span></div>
            <div className="pr-detail-item"><label>Price</label><span>₼{booking.price}</span></div>
            <div className="pr-detail-item"><label>Date</label><span>{booking.date}</span></div>
            <div className="pr-detail-item"><label>Time</label><span>{booking.time}</span></div>
            <div className="pr-detail-item"><label>Duration</label><span>{booking.duration}</span></div>
          </div>
          {booking.notes && (
            <div style={{ background: 'var(--pr-bg)', borderRadius: '10px', padding: '14px 16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pr-text-lt)', marginBottom: '6px' }}>Notes</p>
              <p style={{ fontSize: '14px', color: 'var(--pr-text)' }}>{booking.notes}</p>
            </div>
          )}
        </div>
        <div className="pr-modal-footer">
          {booking.status === 'Pending' && (
            <>
              <button className="pr-btn pr-btn-danger"  onClick={() => onReject(booking.id)}>✕ Reject</button>
              <button className="pr-btn pr-btn-success" onClick={() => onAccept(booking.id)}>✓ Accept</button>
            </>
          )}
          {booking.status === 'Confirmed' && (
            <>
              <button className="pr-btn pr-btn-danger"  onClick={() => onCancel(booking.id)}>Cancel</button>
              <button className="pr-btn pr-btn-primary" onClick={() => onComplete(booking.id)}>✅ Mark Completed</button>
            </>
          )}
          <button className="pr-btn pr-btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}