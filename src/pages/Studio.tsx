import { QrEmail } from '@/components/QrEmail'
import { QrOptions } from '@/components/QrOptions'
import { QrText } from '@/components/QrText'
import { QrUrl } from '@/components/QrUrl'
import { Button } from '@/components/ui/button'
import { useQr } from '@/hooks/useQr'
import { useFileStore } from '@/store/fileStore'
import { useQrStore } from '@/store/qrStore'
import { LoaderCircle, QrCode } from 'lucide-react'
import { useState } from 'react'
import { Route, Router } from 'wouter'

export const Studio = () => {
  const [isLoad, setIsLoad] = useState(false)
  const customImage = useFileStore((state) => state.customImage)
  const content = useQrStore((state) => state.content)
  const { createQR } = useQr()

  const handleButton = () => {
    createQR({ content, setIsLoad, customImage })
  }

  return (
    <section className="w-full h-full">
      <div className="">
        <QrOptions />
      </div>

      <div className="w-full h-[90%] grid grid-cols-2">
        <div className="">
          <StudioRouter />
        </div>
        <div className="w-full flex justify-center items-center flex-col border-l-2 border-black">
          <div className="w-64">
            <img src="/cm.png" alt="" />
          </div>
          <div>
            <Button disabled={isLoad} onClick={handleButton} className="w-full">
              Crear{' '}
              {isLoad ? <LoaderCircle className="animate-spin" /> : <QrCode />}
            </Button>
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
