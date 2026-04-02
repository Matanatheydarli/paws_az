import React from 'react'

export default function BlogCard({ image, category, title, description, author, meta, onClick, featured = false }) {
  return (
    <div className={`blog-card reveal-on-scroll${featured ? ' featured-blog-card' : ''}`} onClick={onClick}>
      <div className="blog-card-img"><img src={image} alt="blog" /></div>
      <div className="blog-card-body">
        <p className="blog-category">{category}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="blog-meta"><strong>{author}</strong> · {meta}</div>
      </div>
    </div>
  )
}