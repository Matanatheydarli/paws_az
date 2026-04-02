import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Services from './pages/Services'
import Dashboard from './pages/Dashboard'
import BecomeProvider from './pages/BecomeProvider'
import CareDonate from './pages/CareDonate'
import Shop from './pages/Shop'
import Contact from './pages/Contact'

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'login')           return <Login          setPage={setPage} />
  if (page === 'services')        return <Services       setPage={setPage} />
  if (page === 'dashboard')       return <Dashboard      setPage={setPage} />
  if (page === 'become-provider') return <BecomeProvider setPage={setPage} />
  if (page === 'care-donate')     return <CareDonate     setPage={setPage} />
  if (page === 'shop')            return <Shop           setPage={setPage} />
  if (page === 'contact')         return <Contact        setPage={setPage} />
  return <Home setPage={setPage} />
}