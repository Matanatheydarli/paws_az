export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="pr-page-header">
      <div className="pr-page-header-left">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}