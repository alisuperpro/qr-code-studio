import { useToast } from '@/hooks/use-toast'
import { invoke } from '@tauri-apps/api/core'
import { useDialog } from './useDialog'
import { useFs } from './useFs'

export const useQr = () => {
  const { toast } = useToast()
  const { saveImage } = useDialog()
  const { isExistFile } = useFs()

  const createQR = async ({
    url,
    setIsLoad,
    customImage,
  }: {
    url: string
    setIsLoad: any
    customImage: any
  }) => {
    const file = await saveImage()
    setIsLoad(true)

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
          qrContent: url,
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
          content: url,
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
