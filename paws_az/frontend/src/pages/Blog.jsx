import React, { useState } from 'react'
import BlogCard from '../components/BlogCard.jsx'

export default function Blog() {
  const [active, setActive] = useState('All')
  const filters = ['All', '🐶 Dogs', '🐈 Cats', '🩺 Health', '🎓 Training', '🍽️ Nutrition']
  const cards = [
    ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', '🐾 Pet Health', '10 Signs Your Dog Needs a Vet Visit Right Away', 'Learn to recognize the warning signs that require immediate veterinary attention.', 'Leyla H.', 'Mar 15 · 6 min'],
    ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80', '😺 Cat Care', 'Why Indoor Cats Still Need Regular Vet Check-ups', "Even cats that never go outside can develop serious health issues. Here's what to watch for.", 'Nigar R.', 'Mar 10 · 4 min'],
    ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', '🎓 Training', 'Positive Reinforcement: The Science of Happy Training', "Modern dog training has moved away from dominance theories. Here's what research says actually works.", 'Orxan M.', 'Mar 5 · 5 min'],
    ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80', '🐶 Dogs', 'How Much Exercise Does Your Dog Really Need?', "The answer varies wildly by breed, age, and health — here's a complete breakdown for every dog type.", 'Anar H.', 'Feb 28 · 7 min'],
    ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80', '🍽️ Nutrition', 'Reading Pet Food Labels: What to Look For', "Marketing terms can be misleading. Here's what the ingredients list really tells you about your pet's food.", 'Leyla H.', 'Feb 20 · 8 min'],
    ['https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&q=80', '🐾 Lifestyle', 'Making Your Home Pet-Safe: A Room-by-Room Guide', "From toxic houseplants to hidden hazards, here's how to create a truly safe space for your animals.", 'Sevinj K.', 'Feb 15 · 6 min'],
  ]

  return (
    <div className="page page-blog active">
      <div className="page-hero">
        <h1>Paws <em>blog</em></h1>
        <p>Expert advice, care tips, and heartwarming stories for every pet parent.</p>
      </div>

      <div className="services-all">
        <div className="section-max">
          <div className="services-filter">
            {filters.map((item) => (
              <button
                key={item}
                className={`filter-btn ${active === item ? 'active' : ''}`}
                type="button"
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="blog-page-grid">
            {cards.map(([image, category, title, description, author, meta]) => (
              <BlogCard
                key={title}
                image={image}
                category={category}
                title={title}
                description={description}
                author={author}
                meta={meta}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}