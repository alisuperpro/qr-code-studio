import { create } from 'zustand'

type contentType = string | undefined
export type levelType = 'L' | 'M' | 'Q' | 'H'

interface useQrStoreType {
  content: contentType
  level: levelType
  version: number
  setContent: (content: contentType) => void
  setLevel: (level: levelType) => void
  setVersion: (version: number) => void
  removeContent: () => void
  resetQrInfo: () => void
}

export const useQrStore = create<useQrStoreType>((set) => {
  return {
    content: '',
    level: 'M',
    version: 0,
    setContent: (content) => {
      set({ content })
    },
    setLevel: (level) => {
      set({ level })
    },
    setVersion: (version) => {
      set({ version })
    },
    removeContent: () => {
      set({ content: '' })
    },
    resetQrInfo: () => {
      set({
        level: 'M',
        version: 0,
      })
    },
  }
})
