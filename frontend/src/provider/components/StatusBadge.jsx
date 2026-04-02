export default function StatusBadge({ status }) {
  const map = {
    Pending:   'pr-badge-pending',
    Confirmed: 'pr-badge-confirmed',
    Completed: 'pr-badge-completed',
    Rejected:  'pr-badge-rejected',
    Cancelled: 'pr-badge-cancelled',
  }
  const dots = {
    Pending:   '🟡',
    Confirmed: '🟢',
    Completed: '🔵',
    Rejected:  '🔴',
    Cancelled: '⚪',
  }
  return (
    <span className={'pr-badge ' + (map[status] || '')}>
      {dots[status]} {status}
    </span>
  )
}