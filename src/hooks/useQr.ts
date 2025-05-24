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
        saveQrToFile({
          content,
          level,
          size: qrImageSize,
          version,
          qrPath: file,
        })

        removeContent()
      } else {
        saveQrWithLogoToFile({
          content,
          level,
          logoPath: customImage,
          logoSize,
          qrImageSize,
          version,
          qrPath: file,
        })

        removeContent()
        resetImageInfo()
      }
    } else {
    }
    resetImageInfo()
    removeContent()
    setIsLoad(false)
  }

  async function saveQrWithLogoToFile({
    content,
    logoPath,
    version,
    level,
    qrImageSize,
    logoSize,
    qrPath,
  }: {
    content: string | undefined
    level: levelType
    version?: number
    qrImageSize: number
    qrPath: string
    logoSize: number
    logoPath: string
  }) {
    if (qrPath) {
      const options = {
        content,
        logo_path: logoPath,
        qr_path: qrPath, // Aquí pasamos la ruta de guardado
        version,
        ec_level: level,
        qr_image_size: qrImageSize,
        logo_size: logoSize,
      }

      try {
        await invoke('save_qr_with_logo', { options })
        toast({
          title: 'QR Creado',
          description: `El QR ha sido creado con exito.`,
          duration: 2000,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al crear el qr: ${error}`,
          duration: 2000,
        })
      }
    } else {
      console.log('Guardado cancelado por el usuario.')
    }
  }

  async function saveQrToFile({
    content,
    level,
    size,
    version,
    qrPath,
  }: {
    content: string | undefined
    level: levelType
    version?: number
    size: number
    qrPath: string
  }) {
    if (qrPath) {
      try {
        await invoke('save_qr', {
          options: {
            content,
            path: qrPath,
            level,
            size,
            version,
          },
        })
        toast({
          title: 'QR Creado',
          description: `El QR ha sido creado con exito.`,
          duration: 2000,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error al crear el qr: ${error}`,
          duration: 2000,
        })
      }
    } else {
      console.log('Guardado cancelado por el usuario.')
    }
  }

  async function generateQrWithLogoPreview({
    content,
    level,
    size,
    version,
    logoSize,
    logoPath,
  }: {
    content: string | undefined
    logoPath: any
    level: levelType
    version?: number
    size: number
    logoSize: number
  }) {
    const options = {
      content,
      logo_path: logoPath, // ¡Asegúrate de que esta ruta sea accesible para el backend de Rust!
      version, // 0 para auto
      ec_level: level, // Nivel de corrección de error alto para acomodar el logo
      qr_image_size: size, // Tamaño final del QR
      logo_size: logoSize, // Tamaño del logo dentro del QR
    }

    try {
      const result = await invoke('preview_qr_with_logo', { options })
      const imgElement = document.getElementById('qr-preview-image')
      if (imgElement) {
        // @ts-ignore define in dts
        imgElement.src = result.data_url
      }
    } catch (error) {
      console.error('Error al generar la vista previa del QR con logo:', error)
    }
  }

  async function generateQrPreview({
    content,
    level,
    size,
    version,
  }: {
    content: string | undefined
    level: levelType
    version?: number
    size: number
  }) {
    try {
      const result = await invoke('preview_qr', {
        options: {
          content,
          level,
          size,
          version,
        },
      })
      // result.data_url contendrá la cadena base64
      const imgElement = document.getElementById(
        'qr-preview-image'
      ) as HTMLImageElement
      if (imgElement) {
        // @ts-ignore define in dts
        imgElement.src = result.data_url
      }
    } catch (error) {
      console.error('Error al generar la vista previa del QR:', error)
    }
  }

  return { createQR, generateQrWithLogoPreview, generateQrPreview }
}
