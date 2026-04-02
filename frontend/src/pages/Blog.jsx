import { useState } from 'react'
import Navbar from '../components/Navbar'

const POSTS = [
  {
    id: 1,
    cat: 'Pet Health',
    catColor: 'var(--green-500)',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    title: '10 Signs Your Dog Needs a Vet Visit Right Away',
    excerpt: 'Learn to recognise the warning signs that require immediate veterinary attention — from unusual lethargy to changes in appetite and behaviour.',
    author: 'Leyla Huseynova',
    date: 'Mar 15, 2026',
    read: '6 min',
  },
  {
    id: 2,
    cat: 'Cat Care',
    catColor: '#7ab8e8',
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80',
    title: 'Why Indoor Cats Still Need Regular Vet Check-ups',
    excerpt: 'Even cats that never go outside can develop serious health issues. Here is what every cat owner should watch for.',
    author: 'Nigar Rzayeva',
    date: 'Mar 10, 2026',
    read: '4 min',
  },
  {
    id: 3,
    cat: 'Training',
    catColor: '#f5c842',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    title: 'Positive Reinforcement: The Science of Happy Training',
    excerpt: 'Modern dog training has moved away from dominance theories. Here is what research actually says works.',
    author: 'Orxan Mammadli',
    date: 'Mar 5, 2026',
    read: '5 min',
  },
  {
    id: 4,
    cat: 'Nutrition',
    catColor: '#f0826a',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80',
    title: 'Reading Pet Food Labels: What to Look For',
    excerpt: 'Marketing terms can be misleading. Here is what the ingredients list really tells you about your pet\'s food.',
    author: 'Leyla Huseynova',
    date: 'Feb 28, 2026',
    read: '8 min',
  },
  {
    id: 5,
    cat: 'Dog Care',
    catColor: 'var(--green-500)',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    title: 'How Much Exercise Does Your Dog Really Need?',
    excerpt: 'The answer varies by breed, age, and health. Here is a complete breakdown for every type of dog owner.',
    author: 'Anar Hasanli',
    date: 'Feb 20, 2026',
    read: '7 min',
  },
  {
    id: 6,
    cat: 'Small Pets',
    catColor: '#c084fc',
    img: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&q=80',
    title: 'Beginner\'s Guide to Keeping Rabbits as House Pets',
    excerpt: 'Rabbits are social, intelligent animals that thrive indoors. Everything you need to know before bringing one home.',
    author: 'Sevinj Karimova',
    date: 'Feb 14, 2026',
    read: '6 min',
  },
  {
    id: 7,
    cat: 'Bird Care',
    catColor: '#60c4e8',
    img: 'https://images.unsplash.com/photo-1604916851289-390068e23f08?w=600&q=80',
    title: 'Top 5 Pet Birds for Beginners in Azerbaijan',
    excerpt: 'Thinking about a feathered friend? We rank the most beginner-friendly birds and share care tips for each.',
    author: 'Kamran Rzayev',
    date: 'Feb 8, 2026',
    read: '5 min',
  },
  {
    id: 8,
    cat: 'Fish',
    catColor: '#38bdf8',
    img: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&q=80',
    title: 'Setting Up Your First Aquarium: A Step-by-Step Guide',
    excerpt: 'From choosing the right tank to cycling the water and picking compatible fish — everything a first-timer needs.',
    author: 'Nigar Rzayeva',
    date: 'Feb 1, 2026',
    read: '9 min',
  },
  {
    id: 9,
    cat: 'Pet Health',
    catColor: 'var(--green-500)',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
    title: 'Making Your Home Pet-Safe: A Room-by-Room Guide',
    excerpt: 'From toxic houseplants to kitchen hazards — here is how to make every room safe for your animals.',
    author: 'Leyla Huseynova',
    date: 'Jan 25, 2026',
    read: '6 min',
  },
]

const CATS = ['All', 'Pet Health', 'Dog Care', 'Cat Care', 'Training', 'Nutrition', 'Small Pets', 'Bird Care', 'Fish']

export default function Blog({ setPage }) {
  const [activecat, setActivecat] = useState('All')
  const [search, setSearch]       = useState('')

  let posts = POSTS.filter((p) => {
    const matchCat    = activecat === 'All' || p.cat === activecat
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--green-100)', display: 'flex', flexDirection: 'column' }}>

      <Navbar setPage={setPage} activePage="blog" />

      {/* ── HERO ── */}
      <section style={{
        padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,80px)',
        background: 'var(--green-100)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p className="section-eyebrow">Knowledge & tips</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <h1 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(42px,5.5vw,72px)',
              fontWeight: 700,
              letterSpacing: '-2px',
              lineHeight: 1.08,
              color: 'var(--text-dark)',
            }}>
              The Paws.az <em style={{ fontStyle: 'italic', color: 'var(--green-500)', fontWeight: 300 }}>Blog</em>
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.7, maxWidth: '440px' }}>
              Expert advice, care tips, and heartwarming stories for every pet parent in Azerbaijan.
            </p>
          </div>

          {/* search + filters row */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'white', borderRadius: '50px',
              padding: '10px 10px 10px 22px',
              boxShadow: 'var(--shadow-soft)',
              border: '1.5px solid var(--green-200)',
              flex: '0 0 320px',
            }}>
              <span style={{ fontSize: '16px', color: 'var(--text-light)' }}>🔍</span>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                  background: 'transparent', color: 'var(--text-dark)',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--text-light)' }}
                >
                  ✕
                </button>
              )}
            </div>

            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActivecat(c)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '50px',
                  border: '1.5px solid',
                  borderColor: activecat === c ? 'var(--green-500)' : 'var(--green-200)',
                  background: activecat === c ? 'var(--green-500)' : 'white',
                  color: activecat === c ? 'white' : 'var(--text-mid)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="section-pad" style={{ background: 'var(--warm-white)', flex: 1, position: 'relative', zIndex: 1 }}>
        <div className="section-max">

          {search && (
            <p style={{ fontSize: '14px', color: 'var(--text-mid)', marginBottom: '24px' }}>
              {posts.length > 0
                ? <span>Found <strong>{posts.length}</strong> articles for "<strong>{search}</strong>"</span>
                : <span>No results for "<strong>{search}</strong>"</span>
              }
            </p>
          )}

          {posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>📭</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>No articles found</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '20px' }}>Try a different category or search term.</p>
              <button className="btn-primary" onClick={() => { setActivecat('All'); setSearch('') }}>Clear filters</button>
            </div>
          )}

          {posts.length > 0 && (
            <div className="blog-grid">
              {posts.map((post, i) => (
                <div
                  className={'blog-card-v2' + (i === 0 && activecat === 'All' && !search ? ' blog-card-featured' : '')}
                  key={post.id}
                >
                  <div className="blog-card-v2-img">
                    <img src={post.img} alt={post.title} />
                    <span
                      className="blog-post-cat-badge"
                      style={{ background: post.catColor }}
                    >
                      {post.cat}
                    </span>
                  </div>
                  <div className="blog-card-v2-body">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-post-meta-row">
                      <span className="blog-author-name">✍️ {post.author}</span>
                      <span className="blog-meta-dot">·</span>
                      <span>{post.date}</span>
                      <span className="blog-meta-dot">·</span>
                      <span>⏱ {post.read} read</span>
                    </div>
                    <button className="blog-read-btn">Read article →</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── NEWSLETTER ── */}
          <div style={{
            background: 'var(--green-500)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(40px,5vh,60px)',
            marginTop: '60px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '180px', opacity: 0.05, pointerEvents: 'none' }}>🐾</div>
            <div>
              <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Stay updated</p>
              <h2 style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(26px,3vw,40px)',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-1px',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}>
                Never miss a <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#f5c842' }}>tip</em>
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                Get the latest pet care articles and Paws.az news delivered to your inbox every week.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1, minWidth: '200px',
                  padding: '14px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '15px',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.95)',
                  color: 'var(--text-dark)',
                }}
              />
              <button
                className="btn-primary"
                style={{ background: 'var(--text-dark)', padding: '14px 28px', whiteSpace: 'nowrap' }}
              >
                Subscribe 🐾
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--text-dark)', padding: '40px clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', fontWeight: 700, color: 'var(--green-300)' }}>🐾 Paws.az</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Paws.az. All rights reserved.</p>
          <button className="btn-outline" style={{ borderColor: 'var(--green-400)', color: 'var(--green-300)' }} onClick={() => setPage('home')}>
            Back to home
          </button>
        </div>
      </footer>

    </div>
  )
}