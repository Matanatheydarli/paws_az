import React, { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Leyla Huseynova',
    location: 'Baku',
    role: 'Pet parent',
  })

  const value = useMemo(
    () => ({
      user,
      login: () => setUser({ name: 'Leyla Huseynova', location: 'Baku', role: 'Pet parent' }),
      logout: () => setUser(null),
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}