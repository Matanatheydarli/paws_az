import StatsCard from '../components/StatsCard'

export default function ProviderAnalytics({ bookings }) {
  const total     = bookings.length
  const pending   = bookings.filter((b) => b.status === 'Pending').length
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length
  const completed = bookings.filter((b) => b.status === 'Completed').length
  const rejected  = bookings.filter((b) => b.status === 'Rejected').length
  const cancelled = bookings.filter((b) => b.status === 'Cancelled').length
  const revenue   = bookings.filter((b) => b.status === 'Completed').reduce((s, b) => s + b.price, 0)

  const serviceCount = {}
  bookings.forEach((b) => { serviceCount[b.service] = (serviceCount[b.service] || 0) + 1 })
  const popularServices = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])

  const statusData = [
    { label: 'Completed', value: completed, color: 'var(--pr-blue)',  pct: total ? Math.round(completed / total * 100) : 0 },
    { label: 'Confirmed', value: confirmed, color: 'var(--pr-green)', pct: total ? Math.round(confirmed / total * 100) : 0 },
    { label: 'Pending',   value: pending,   color: 'var(--pr-yellow)',pct: total ? Math.round(pending   / total * 100) : 0 },
    { label: 'Rejected',  value: rejected,  color: 'var(--pr-coral)', pct: total ? Math.round(rejected  / total * 100) : 0 },
    { label: 'Cancelled', value: cancelled, color: '#aaa',            pct: total ? Math.round(cancelled / total * 100) : 0 },
  ]

  return (
    <div>
      <div className="pr-page-header">
        <div className="pr-page-header-left">
          <h1>Analytics</h1>
          <p>Your performance overview</p>
        </div>
      </div>

      {/* stats */}
      <div className="pr-stats-grid">
        <StatsCard icon="📊" value={total}          label="Total Bookings"    change="All time" />
        <StatsCard icon="✅" value={completed}       label="Completed"         change={total ? Math.round(completed/total*100) + '% completion rate' : '0%'} changeType="up" />
        <StatsCard icon="💰" value={'₼' + revenue}  label="Revenue Earned"    change="Completed only" changeType="up" />
        <StatsCard icon="⭐" value="4.9"             label="Average Rating"    change="213 reviews"    changeType="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* bookings by status */}
        <div className="pr-card">
          <div className="pr-card-header"><h3>Bookings by Status</h3></div>
          <div className="pr-card-body">
            <div className="pr-chart-bar-wrap">
              {statusData.map((s) => (
                <div className="pr-chart-row" key={s.label}>
                  <span className="pr-chart-label">{s.label}</span>
                  <div className="pr-chart-bar-bg">
                    <div className="pr-chart-bar-fill" style={{ width: s.pct + '%', background: s.color }} />
                  </div>
                  <span className="pr-chart-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* popular services */}
        <div className="pr-card">
          <div className="pr-card-header"><h3>Popular Services</h3></div>
          <div className="pr-card-body">
            <div className="pr-chart-bar-wrap">
              {popularServices.map(([name, count]) => (
                <div className="pr-chart-row" key={name}>
                  <span className="pr-chart-label" style={{ width: '140px' }}>{name}</span>
                  <div className="pr-chart-bar-bg">
                    <div className="pr-chart-bar-fill" style={{ width: (count / (popularServices[0]?.[1] || 1) * 100) + '%' }} />
                  </div>
                  <span className="pr-chart-val">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* recent activity */}
        <div className="pr-card" style={{ gridColumn: '1 / -1' }}>
          <div className="pr-card-header"><h3>Recent Bookings Activity</h3></div>
          <div className="pr-card-body" style={{ padding: 0 }}>
            <table className="pr-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 8).map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600, color: 'var(--pr-green-dk)' }}>{b.id}</td>
                    <td>{b.customerName}</td>
                    <td>{b.service}</td>
                    <td>{b.date}</td>
                    <td style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                      {b.status === 'Completed' ? '₼' + b.price : '—'}
                    </td>
                    <td>
                      <span className={'pr-badge pr-badge-' + b.status.toLowerCase()}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}