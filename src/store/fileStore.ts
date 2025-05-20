import { create } from 'zustand'

type customImageType = string | null

interface useFileStoreType {
  customImage: customImageType
  qrImageSize: number
  logoSize: number
  setCustomImage: ({ customImage }: { customImage: customImageType }) => void
  setQrImageSize: (qrImageSize: number) => void
  setLogoSize: (logoSize: number) => void
  resetImageInfo: () => void
}

export const useFileStore = create<useFileStoreType>((set) => {
  return {
    customImage: null,
    qrImageSize: 512,
    logoSize: 150,
    setCustomImage: ({ customImage }) => {
      set({ customImage })
    },
    setQrImageSize: (qrImageSize) => {
      set({ qrImageSize })
    },
    setLogoSize: (logoSize) => {
      set({ logoSize })
    },
    resetImageInfo: () => {
      set({
        customImage: null,
        qrImageSize: 512,
        logoSize: 150,
      })
    },
  }
})
