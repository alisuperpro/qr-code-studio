import { create } from 'zustand'

type contentType = string | undefined

interface useQrStoreType {
  content: contentType
  setContent: (content: contentType) => void
}

export const useQrStore = create<useQrStoreType>((set) => {
  return {
    content: '',
    setContent: (content) => {
      set({ content })
    },
  }
})
