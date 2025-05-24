import { QrAdvancedOptions } from '@/components/QrAdvancedOptions'
import { QrEmail } from '@/components/QrEmail'
import { QrOptions } from '@/components/QrOptions'
import { QrText } from '@/components/QrText'
import { QrUrl } from '@/components/QrUrl'
import { Button } from '@/components/ui/button'
import { useQr } from '@/hooks/useQr'
import { useFileStore } from '@/store/fileStore'
import { useQrStore } from '@/store/qrStore'
import { LoaderCircle, QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Route, Router } from 'wouter'

export const Studio = () => {
  const [isLoad, setIsLoad] = useState(false)
  const customImage = useFileStore((state) => state.customImage)
  const content = useQrStore((state) => state.content)
  const level = useQrStore((state) => state.level)
  const version = useQrStore((state) => state.version)
  const qrImageSize = useFileStore((state) => state.qrImageSize)
  const logoSize = useFileStore((state) => state.logoSize)
  const { createQR, generateQrPreview, generateQrWithLogoPreview } = useQr()

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

  return (
    <section className="w-full h-full">
      <div className="">
        <QrOptions />
      </div>

      <div className="w-full h-[90%] grid grid-cols-4">
        <div className="col-span-2">
          <StudioRouter />
        </div>
        <div className="col-span-2 w-full flex justify-center items-center gap-x-2 px-2 border-l-2 border-black">
          <div className="px-4">
            <div className="w-60">
              <img src="/cm.png" id="qr-preview-image" alt="" />
            </div>
            <div>
              <Button
                disabled={isLoad}
                onClick={handleButton}
                className="w-full"
              >
                Crear{' '}
                {isLoad ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <QrCode />
                )}
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-start w-full h-full px-4 py-2 border-l-[1px] rounded-md bg-gradient-to-r from-gray-100 to-gray-50">
            <QrAdvancedOptions />
          </div>
        </div>
      </div>
    </section>
  )
}

const StudioRouter = () => {
  return (
    <>
      <Router base="/studio">
        <Route path="/" component={QrUrl} />
        <Route path="/text" component={QrText} />
        <Route path="/email" component={QrEmail} />
      </Router>
    </>
  )
}
