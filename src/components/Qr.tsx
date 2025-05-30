import { Button } from '@/components/ui/button'
import { useQr } from '@/hooks/useQr'
import { useFileStore } from '@/store/fileStore'
import { useQrStore } from '@/store/qrStore'
import { LoaderCircle, QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Qr = () => {
  const { generateQrPreview, generateQrWithLogoPreview } = useQr()
  const [isLoad, setIsLoad] = useState(false)
  const customImage = useFileStore((state) => state.customImage)
  const content = useQrStore((state) => state.content)
  const level = useQrStore((state) => state.level)
  const version = useQrStore((state) => state.version)
  const qrImageSize = useFileStore((state) => state.qrImageSize)
  const logoSize = useFileStore((state) => state.logoSize)
  const { createQR } = useQr()

  useEffect(() => {
    if (customImage !== null) {
      generateQrWithLogoPreview({
        content,
        level,
        size: qrImageSize,
        version,
        logoPath: customImage,
        logoSize,
      })
    } else {
      generateQrPreview({ content, level, size: qrImageSize, version })
    }
  }, [content, level, qrImageSize, version, customImage, logoSize])

  const handleButton = () => {
    createQR({
      content,
      setIsLoad,
      customImage,
      level,
      version,
      qrImageSize,
      logoSize,
    })
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="w-60">
        <img src="/cm.png" id="qr-preview-image" alt="" />
      </div>
      <div>
        <Button disabled={isLoad} onClick={handleButton} className="w-full">
          Crear
          {isLoad ? <LoaderCircle className="animate-spin" /> : <QrCode />}
        </Button>
      </div>
    </div>
  )
}
