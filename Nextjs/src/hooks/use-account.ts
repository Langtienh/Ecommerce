import { User } from '@/services/user'
import { create } from 'zustand'

interface State {
  user: User | null
}

interface Action {
  setUser: (user: User) => void
  removeUser: () => void
}

const useAccount = create<State & Action>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null })
}))

export default useAccount
