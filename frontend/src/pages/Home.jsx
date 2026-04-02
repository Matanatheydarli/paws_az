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
      <Hero setPage={setPage} />
      <Services setPage={setPage} />
      <Footer setPage={setPage} />
    </>
  )
}