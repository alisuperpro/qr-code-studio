import { create } from 'zustand'

type customImageType = string | null

interface useFileStoreType {
  customImage: customImageType
  setCustomImage: ({ customImage }: { customImage: customImageType }) => void
}

export const useFileStore = create<useFileStoreType>((set) => {
  return {
    customImage: null,
    setCustomImage: ({ customImage }) => {
      set({ customImage })
    },
  }
})
