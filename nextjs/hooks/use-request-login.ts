import { create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Action {
  callBackUrl?: string
  openHandle: (callBackUrl?: string) => void
  close: () => void
}

const useRequestLogin = create<State & Action>((set) => ({
  callBackUrl: undefined,
  isOpen: false,
  openHandle: (callBackUrl?: string) =>
    set({
      isOpen: true,
      callBackUrl
    }),
  close: () => set({ isOpen: false, callBackUrl: undefined })
}))

export default useRequestLogin
