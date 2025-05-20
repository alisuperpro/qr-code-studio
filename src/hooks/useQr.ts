import { useToast } from '@/hooks/use-toast'
import { invoke } from '@tauri-apps/api/core'
import { useDialog } from './useDialog'
import { useFs } from './useFs'
import { levelType, useQrStore } from '@/store/qrStore'
import { useFileStore } from '@/store/fileStore'

export const useQr = () => {
  const { toast } = useToast()
  const { saveImage } = useDialog()
  const { isExistFile } = useFs()
  const removeContent = useQrStore((state) => state.removeContent)
  const resetImageInfo = useFileStore((state) => state.resetImageInfo)
  const createQR = async ({
    content,
    setIsLoad,
    customImage,
    level,
    version,
    qrImageSize,
    logoSize,
  }: {
    content: string | undefined
    setIsLoad: any
    customImage: any
    level: levelType
    version?: number
    qrImageSize: number
    logoSize: number
  }) => {
    const file = await saveImage()
    setIsLoad(true)

    if (!content) {
      setIsLoad(false)
      toast({
        title: 'Error',
        description: `No hay contenido`,
        duration: 2000,
      })
      setIsLoad(false)
      return
    }

    if (file === null) {
      setIsLoad(false)
      toast({
        title: 'Error',
        description: `Ruta no encontrada (${file})`,
        duration: 2000,
      })
      setIsLoad(false)
      return
    }

    const isExistFileInPath = await isExistFile(file)

    if (isExistFileInPath === false) {
      if (customImage === null) {
        const result = await invoke('create_qr', {
          options: {
            content,
            path: file,
            level,
            size: qrImageSize,
            version: version,
          },
        })

        if (result === null) {
          toast({
            title: 'QR Creado',
            description: `El QR ha sido creado con exito.`,
            duration: 2000,
          })
        }

        removeContent()
      } else {
        const result = await invoke('qr_with_logo', {
          content,
          logoPath: customImage,
          qrPath: file,
          version: version,
          ecLevel: level,
          qrImageSize,
          logoSize,
        })

        if (result === null) {
          toast({
            title: 'QR Creado',
            description: `El QR ha sido creado con exito.`,
            duration: 2000,
          })
        }
        removeContent()
        resetImageInfo()
      }
    } else {
    }
    resetImageInfo()
    removeContent()
    setIsLoad(false)
  }

  return { createQR }
}
