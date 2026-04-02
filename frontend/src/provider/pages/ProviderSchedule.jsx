import { useState } from 'react'

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

export default function ProviderSchedule({ schedule, setSchedule }) {
  const [newBreak, setNewBreak] = useState({ label: '', from: '13:00', to: '14:00' })
  const [newDate,  setNewDate]  = useState('')

  function toggleDay(day) {
    setSchedule((prev) => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: { ...prev.workingDays[day], open: !prev.workingDays[day].open },
      },
    }))
  }

  function updateTime(day, field, value) {
    setSchedule((prev) => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: { ...prev.workingDays[day], [field]: value },
      },
    }))
  }

  function addBreak() {
    if (!newBreak.label) return
    setSchedule((prev) => ({ ...prev, breaks: [...prev.breaks, { id: Date.now(), ...newBreak }] }))
    setNewBreak({ label: '', from: '13:00', to: '14:00' })
  }

  function removeBreak(id) {
    setSchedule((prev) => ({ ...prev, breaks: prev.breaks.filter((b) => b.id !== id) }))
  }

  function addUnavailable() {
    if (!newDate || schedule.unavailableDates.includes(newDate)) return
    setSchedule((prev) => ({ ...prev, unavailableDates: [...prev.unavailableDates, newDate].sort() }))
    setNewDate('')
  }

  function removeUnavailable(d) {
    setSchedule((prev) => ({ ...prev, unavailableDates: prev.unavailableDates.filter((x) => x !== d) }))
  }

  return (
    <div>
      <div className="pr-page-header">
        <div className="pr-page-header-left">
          <h1>Schedule & Availability</h1>
          <p>Set your working hours and unavailable dates</p>
        </div>
        <button className="pr-btn pr-btn-primary pr-btn-lg">Save Changes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>

        {/* working hours */}
        <div>
          <div className="pr-card" style={{ marginBottom: '20px' }}>
            <div className="pr-card-header"><h3>Working Days & Hours</h3></div>
            <div className="pr-card-body">
              <div className="pr-schedule-grid">
                {DAYS.map((day) => {
                  const d = schedule.workingDays[day]
                  return (
                    <div className="pr-schedule-row" key={day}>
                      <div className="pr-schedule-day" style={{ textTransform: 'capitalize' }}>{day}</div>
                      <div className="pr-toggle-wrap">
                        <button className={'pr-toggle ' + (d.open ? 'on' : 'off')} onClick={() => toggleDay(day)}>
                          <div className="pr-toggle-thumb" />
                        </button>
                        <span style={{ fontSize: '13px', color: d.open ? 'var(--pr-green-dk)' : 'var(--pr-text-lt)', fontWeight: 500 }}>
                          {d.open ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      {d.open ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                          <input className="pr-time-input" type="time" value={d.from} onChange={(e) => updateTime(day, 'from', e.target.value)} />
                          <span style={{ color: 'var(--pr-text-lt)', fontSize: '13px' }}>to</span>
                          <input className="pr-time-input" type="time" value={d.to}   onChange={(e) => updateTime(day, 'to',   e.target.value)} />
                        </div>
                      ) : (
                        <span className="pr-schedule-closed" style={{ marginLeft: 'auto' }}>Not available</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* break times */}
          <div className="pr-card">
            <div className="pr-card-header"><h3>Break Times</h3></div>
            <div className="pr-card-body">
              {schedule.breaks.map((b) => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--pr-border)' }}>
                  <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>{b.label}</span>
                  <span style={{ fontSize: '13px', color: 'var(--pr-text-lt)' }}>{b.from} – {b.to}</span>
                  <button className="pr-btn pr-btn-danger pr-btn-sm" onClick={() => removeBreak(b.id)}>✕</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                <input className="pr-time-input" style={{ flex: 2 }} type="text" placeholder="Break name" value={newBreak.label} onChange={(e) => setNewBreak({ ...newBreak, label: e.target.value })} />
                <input className="pr-time-input" type="time" value={newBreak.from} onChange={(e) => setNewBreak({ ...newBreak, from: e.target.value })} />
                <input className="pr-time-input" type="time" value={newBreak.to}   onChange={(e) => setNewBreak({ ...newBreak, to: e.target.value })} />
                <button className="pr-btn pr-btn-primary pr-btn-sm" onClick={addBreak}>Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* unavailable dates */}
        <div className="pr-card" style={{ height: 'fit-content' }}>
          <div className="pr-card-header"><h3>Unavailable Dates</h3></div>
          <div className="pr-card-body">
            <p style={{ fontSize: '13px', color: 'var(--pr-text-lt)', marginBottom: '16px', lineHeight: 1.6 }}>
              Mark specific dates when you are not available for bookings (holidays, leave, etc.)
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={{ flex: 1, padding: '9px 12px', border: '1.5px solid var(--pr-border)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', outline: 'none' }}
              />
              <button className="pr-btn pr-btn-primary" onClick={addUnavailable}>Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {schedule.unavailableDates.length === 0 && (
                <p style={{ fontSize: '13px', color: 'var(--pr-text-lt)', textAlign: 'center', padding: '16px 0' }}>No unavailable dates set</p>
              )}
              {schedule.unavailableDates.map((d) => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#fef3e8', borderRadius: '8px', border: '1px solid #fde8c8' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>📅 {d}</span>
                  <button className="pr-btn pr-btn-danger pr-btn-sm" onClick={() => removeUnavailable(d)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}