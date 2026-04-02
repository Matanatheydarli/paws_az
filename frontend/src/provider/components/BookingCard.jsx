import StatusBadge from './StatusBadge'

export default function BookingCard({ booking, onAccept, onReject, onComplete, onCancel, onClick }) {
  function stopAndCall(e, fn) {
    e.stopPropagation()
    fn(booking.id)
  }

  return (
    <div className="pr-booking-card" onClick={() => onClick(booking)}>
      <div className="pr-booking-card-top">
        <div>
          <div className="pr-booking-id">{booking.id}</div>
          <div className="pr-booking-customer">{booking.customerName}</div>
          <div className="pr-booking-pet">🐾 {booking.petName} · {booking.petType}</div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="pr-booking-meta">
        <div className="pr-booking-meta-item"><span>🛠️</span>{booking.service}</div>
        <div className="pr-booking-meta-item"><span>📅</span>{booking.date}</div>
        <div className="pr-booking-meta-item"><span>🕐</span>{booking.time}</div>
        <div className="pr-booking-meta-item"><span>💰</span>₼{booking.price}</div>
      </div>

      <div className="pr-booking-actions">
        {booking.status === 'Pending' && (
          <>
            <button className="pr-btn pr-btn-success pr-btn-sm" onClick={(e) => stopAndCall(e, onAccept)}>✓ Accept</button>
            <button className="pr-btn pr-btn-danger  pr-btn-sm" onClick={(e) => stopAndCall(e, onReject)}>✕ Reject</button>
          </>
        )}
        {booking.status === 'Confirmed' && (
          <>
            <button className="pr-btn pr-btn-primary pr-btn-sm" onClick={(e) => stopAndCall(e, onComplete)}>✅ Complete</button>
            <button className="pr-btn pr-btn-danger  pr-btn-sm" onClick={(e) => stopAndCall(e, onCancel)}>Cancel</button>
          </>
        )}
        {(booking.status === 'Completed' || booking.status === 'Rejected' || booking.status === 'Cancelled') && (
          <span style={{ fontSize: '12px', color: 'var(--pr-text-lt)' }}>No actions available</span>
        )}
      </div>
    </div>
  )
}