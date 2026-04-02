import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Footer from '../components/Footer'

export default function Home({ setPage }) {
  return (
    <>
      <div className="bg-paws">
        <span>🐾</span><span>🐾</span><span>🐾</span>
        <span>🐾</span><span>🐾</span><span>🐾</span>
      </div>

      <Navbar setPage={setPage} activePage="home" />

      {/* 🔥 DEMO BUTTON */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => setPage('provider')}
          style={{
            padding: '12px 20px',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Open Provider Panel (Demo)
        </button>
      </div>

      <Hero setPage={setPage} />
      <Services setPage={setPage} />
      <Footer setPage={setPage} />
    </>
  )
}