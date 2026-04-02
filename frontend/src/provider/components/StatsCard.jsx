export default function StatsCard({ icon, value, label, change, changeType }) {
  return (
    <div className="pr-stat-card">
      <div className="pr-stat-icon">{icon}</div>
      <div className="pr-stat-value">{value}</div>
      <div className="pr-stat-label">{label}</div>
      {change && (
        <div className={'pr-stat-change ' + (changeType || 'up')}>{change}</div>
      )}
    </div>
  )
}