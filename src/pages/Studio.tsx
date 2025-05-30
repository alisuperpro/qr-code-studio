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
import { QrNumberPhone } from '@/components/QrNumberPhone'

export const Studio = () => {
  const customImage = useFileStore((state) => state.customImage)
  const content = useQrStore((state) => state.content)
  const level = useQrStore((state) => state.level)
  const version = useQrStore((state) => state.version)
  const qrImageSize = useFileStore((state) => state.qrImageSize)
  const logoSize = useFileStore((state) => state.logoSize)
  const { generateQrPreview, generateQrWithLogoPreview } = useQr()

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
    <section className="w-full h-[70%]">
      <div className="">
        <QrOptions />
      </div>

      <div className="w-full h-full grid grid-cols-9 gap-x-2">
        <div className="col-span-2">
          <StudioRouter />
        </div>
        <div className="col-span-5 col-start-3">
          <Qr />
        </div>
        <div className="col-span-2 col-start-8">
          <QrAdvancedOptions />
        </div>
      </div>
    </section>
  )
}

const Qr = () => {
  const [isLoad, setIsLoad] = useState(false)
  const customImage = useFileStore((state) => state.customImage)
  const content = useQrStore((state) => state.content)
  const level = useQrStore((state) => state.level)
  const version = useQrStore((state) => state.version)
  const qrImageSize = useFileStore((state) => state.qrImageSize)
  const logoSize = useFileStore((state) => state.logoSize)
  const { createQR } = useQr()

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

const StudioRouter = () => {
  return (
    <>
      <Router base="/studio">
        <Route path="/" component={QrUrl} />
        <Route path="/text" component={QrText} />
        <Route path="/email" component={QrEmail} />
        <Route path="/qr-number-phone" component={QrNumberPhone} />
      </Router>
    </>
  )
}
