import React from 'react'

export default function ServiceCard({ image, alt, tag, title, description, price, unit, actionText, onClick }) {
  return (
    <div className="service-card reveal-on-scroll" onClick={onClick}>
      <div className="service-card-img">
        <img src={image} alt={alt} />
        <span className="service-tag">{tag}</span>
      </div>
      <div className="service-card-body">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="service-footer">
          <div className="service-price">{price} <span>{unit}</span></div>
          <button className="btn-add" type="button">{actionText}</button>
        </div>
      </div>
    </div>
  )
}