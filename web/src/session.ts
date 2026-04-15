import { create } from 'zustand'

type SessionUser = {
  id: string
  name: string
  email: string
  accessToken: string
}

type SessionState = {
  user: SessionUser | null
  setUser: (user: SessionUser) => void
  clearUser: () => void
}

const savedUserRaw = localStorage.getItem('parentshield-web-user')
const savedUser = savedUserRaw ? (JSON.parse(savedUserRaw) as SessionUser) : null

export const useSession = create<SessionState>((set) => ({
  user: savedUser,
  setUser: (user) => {
    localStorage.setItem('parentshield-web-user', JSON.stringify(user))
    set({ user })
  },
  clearUser: () => {
    localStorage.removeItem('parentshield-web-user')
    set({ user: null })
  },
}))
