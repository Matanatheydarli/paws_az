import React from 'react'

export default function SectionHeader({ eyebrow, title, em, buttonText, onButtonClick }) {
  return (
    <div className="section-header">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title} <em>{em}</em></h2>
      </div>
      {buttonText ? (
        <button className="btn-outline" type="button" onClick={onButtonClick}>{buttonText}</button>
      ) : null}
    </div>
  )
}