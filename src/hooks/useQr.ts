import { useToast } from '@/hooks/use-toast'
import { invoke } from '@tauri-apps/api/core'
import { useDialog } from './useDialog'
import { useFs } from './useFs'

export const useQr = () => {
  const { toast } = useToast()
  const { saveImage } = useDialog()
  const { isExistFile } = useFs()

  const createQR = async ({
    content,
    setIsLoad,
    customImage,
  }: {
    content: string | undefined
    setIsLoad: any
    customImage: any
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
          qrContent: content,
          path: file,
        })

        if (result === null) {
          toast({
            title: 'QR Creado',
            description: `El QR ha sido creado con exito.`,
            duration: 2000,
          })
        }
      } else {
        const result = await invoke('qr_with_logo', {
          content: content,
          logoPath: customImage,
          qrPath: file,
        })
        if (result === null) {
          toast({
            title: 'QR Creado',
            description: `El QR ha sido creado con exito.`,
            duration: 2000,
          })
        }
      }
    } else {
    }
    setIsLoad(false)
  }

  return { createQR }
}
