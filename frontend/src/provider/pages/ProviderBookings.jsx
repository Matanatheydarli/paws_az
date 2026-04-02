import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import BookingCard from '../components/BookingCard'

const STATUSES = ['All', 'Pending', 'Confirmed', 'Completed', 'Rejected', 'Cancelled']

export default function ProviderBookings({ bookings, setBookings }) {
  const [filter,          setFilter]          = useState('All')
  const [search,          setSearch]          = useState('')
  const [view,            setView]            = useState('cards')
  const [selectedBooking, setSelectedBooking] = useState(null)

  function updateStatus(id, status) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
  }

  let filtered = bookings
    .filter((b) => filter === 'All' || b.status === filter)
    .filter((b) =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.petName.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
      <div className="pr-page-header">
        <div className="pr-page-header-left">
          <h1>Booking Management</h1>
          <p>{bookings.filter((b) => b.status === 'Pending').length} pending requests</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={'pr-btn pr-btn-sm ' + (view === 'cards' ? 'pr-btn-primary' : 'pr-btn-outline')}
            onClick={() => setView('cards')}
          >
            ☰ Cards
          </button>
          <button
            className={'pr-btn pr-btn-sm ' + (view === 'table' ? 'pr-btn-primary' : 'pr-btn-outline')}
            onClick={() => setView('table')}
          >
            ⊞ Table
          </button>
        </div>
      </div>

      {/* status filter pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {STATUSES.map((s) => {
          const count = s === 'All' ? bookings.length : bookings.filter((b) => b.status === s).length
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '7px 16px',
                borderRadius: '50px',
                border: '1.5px solid',
                borderColor: filter === s ? 'var(--pr-green)' : 'var(--pr-border)',
                background: filter === s ? 'var(--pr-green)' : 'white',
                color: filter === s ? 'white' : 'var(--pr-text-mid)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s} ({count})
            </button>
          )
        })}
      </div>

      {/* search */}
      <div className="pr-filter-bar">
        <div className="pr-search-wrap">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by customer, pet, service, or booking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="pr-empty">
          <div className="pr-empty-icon">📭</div>
          <h4>No bookings found</h4>
          <p>Try adjusting your filters or search.</p>
        </div>
      )}

      {/* cards view */}
      {view === 'cards' && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '14px' }}>
          {filtered.map((b) => (
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
      )}

      {/* table view */}
      {view === 'table' && filtered.length > 0 && (
        <div className="pr-card">
          <div className="pr-card-body" style={{ padding: 0 }}>
            <table className="pr-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Pet</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedBooking(b)}>
                    <td style={{ fontWeight: 600, color: 'var(--pr-green-dk)' }}>{b.id}</td>
                    <td>{b.customerName}</td>
                    <td>{b.petName} <span style={{ fontSize: '12px', color: 'var(--pr-text-lt)' }}>({b.petType})</span></td>
                    <td>{b.service}</td>
                    <td>{b.date} {b.time}</td>
                    <td style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}>₼{b.price}</td>
                    <td><StatusBadge status={b.status} /></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {b.status === 'Pending' && (
                          <>
                            <button className="pr-btn pr-btn-success pr-btn-sm" onClick={() => updateStatus(b.id, 'Confirmed')}>✓</button>
                            <button className="pr-btn pr-btn-danger  pr-btn-sm" onClick={() => updateStatus(b.id, 'Rejected')}>✕</button>
                          </>
                        )}
                        {b.status === 'Confirmed' && (
                          <button className="pr-btn pr-btn-primary pr-btn-sm" onClick={() => updateStatus(b.id, 'Completed')}>✅</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* detail modal */}
      {selectedBooking && (
        <div className="pr-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pr-modal-header">
              <h3>Booking {selectedBooking.id}</h3>
              <button className="pr-modal-close" onClick={() => setSelectedBooking(null)}>✕</button>
            </div>
            <div className="pr-modal-body">
              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                <StatusBadge status={selectedBooking.status} />
                <span style={{ fontSize: '12px', color: 'var(--pr-text-lt)', alignSelf: 'center' }}>Created {selectedBooking.createdAt}</span>
              </div>
              <div className="pr-detail-grid">
                <div className="pr-detail-item"><label>Customer</label><span>{selectedBooking.customerName}</span></div>
                <div className="pr-detail-item"><label>Phone</label><span>{selectedBooking.customerPhone}</span></div>
                <div className="pr-detail-item"><label>Pet</label><span>{selectedBooking.petName}</span></div>
                <div className="pr-detail-item"><label>Breed</label><span>{selectedBooking.petType}</span></div>
                <div className="pr-detail-item"><label>Service</label><span>{selectedBooking.service}</span></div>
                <div className="pr-detail-item"><label>Price</label><span>₼{selectedBooking.price}</span></div>
                <div className="pr-detail-item"><label>Date</label><span>{selectedBooking.date}</span></div>
                <div className="pr-detail-item"><label>Time</label><span>{selectedBooking.time}</span></div>
              </div>
              {selectedBooking.notes && (
                <div style={{ background: 'var(--pr-bg)', borderRadius: '10px', padding: '14px', marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--pr-text-lt)', marginBottom: '4px', fontWeight: 600 }}>NOTES</p>
                  <p style={{ fontSize: '14px' }}>{selectedBooking.notes}</p>
                </div>
              )}
            </div>
            <div className="pr-modal-footer">
              {selectedBooking.status === 'Pending' && (
                <>
                  <button className="pr-btn pr-btn-danger" onClick={() => { updateStatus(selectedBooking.id, 'Rejected'); setSelectedBooking(null) }}>Reject</button>
                  <button className="pr-btn pr-btn-success" onClick={() => { updateStatus(selectedBooking.id, 'Confirmed'); setSelectedBooking(null) }}>Accept</button>
                </>
              )}
              {selectedBooking.status === 'Confirmed' && (
                <>
                  <button className="pr-btn pr-btn-danger" onClick={() => { updateStatus(selectedBooking.id, 'Cancelled'); setSelectedBooking(null) }}>Cancel</button>
                  <button className="pr-btn pr-btn-primary" onClick={() => { updateStatus(selectedBooking.id, 'Completed'); setSelectedBooking(null) }}>Mark Completed</button>
                </>
              )}
              <button className="pr-btn pr-btn-outline" onClick={() => setSelectedBooking(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}