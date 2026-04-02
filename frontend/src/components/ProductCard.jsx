import React from 'react'

export default function ProductCard({
  image,
  alt,
  fav,
  title,
  rating,
  reviews,
  time,
  price,
  actionText = 'Book now',
  onClick,
}) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card-img">
        <img src={image} alt={alt} />
        <div className="product-card-fav">{fav}</div>
      </div>

      <div className="product-card-body">
        <h4>{title}</h4>
        <div className="card-meta">
          <span className="card-rating">
            ⭐ {rating} <span style={{ color: 'var(--text-light)' }}>({reviews})</span>
          </span>
          <span className="card-time">🕐 {time}</span>
        </div>

        <div className="card-bottom">
          <div className="card-price">{price}</div>
          <button
            className="btn-add"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (onClick) onClick()
            }}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  )
}