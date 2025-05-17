import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClipboardPaste, LoaderCircle, QrCode } from 'lucide-react'
import { Label } from './ui/label'
import { useDialog } from '@/hooks/useDialog'
import { useClipboard } from '@/hooks/useClipboard'
import { useQr } from '@/hooks/useQr'

export const QrUrl = () => {
  const [url, setURL] = useState('')
  const [customImage, setCustomImage] = useState<String | null>(null)
  const [isLoad, setIsLoad] = useState(false)
  const { pasteText } = useClipboard()
  const { selectLogo } = useDialog()
  const { createQR } = useQr()

  const selectCustomImage = async (event: any) => {
    event.preventDefault()
    const file = await selectLogo()

    setCustomImage(file)
  }

  const submitQR = async (event: any) => {
    event.preventDefault()
    createQR({ url, setIsLoad, customImage })
  }

  const pasteLink = async (event: any) => {
    event.preventDefault()
    const text = await pasteText()
    setURL(text)
  }
  return (
    <main className="w-full h-full px-4 py-2">
      <form className="w-full h-full grid grid-cols-2" onSubmit={submitQR}>
        <div className="border-r border-stone-700 flex justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-y-2 ">
            <div className="w-96">
              <Label htmlFor="url">URL</Label>
              <div className="w-full flex flex-row justify-center items-center gap-x-2">
                <Input
                  required={true}
                  placeholder="https://cachemarketing.net/"
                  onChange={(event) => setURL(event.target.value)}
                  value={url}
                  id="url"
                />
                <Button size="icon" onClick={pasteLink}>
                  <ClipboardPaste />
                </Button>
              </div>
            </div>
            <div className="flex justify-start items-start w-full flex-col gap-y-2 mt-4">
              <h3 className="font-bold text-md">Opciones Avanzadas</h3>
              <div className="w-full flex flex-row gap-x-2 justify-start items-center">
                <Button onClick={selectCustomImage}>Elegir Imagen</Button>
                {customImage && <Label>{customImage}</Label>}
              </div>
            </div>
          </div>
        </div>

        <div className="border-l border-stone-700 flex justify-center items-center flex-col ">
          <div className="w-64">
            <img src="/cm.png" alt="" />
          </div>
          <div>
            <Button disabled={isLoad} className="w-full">
              Crear{' '}
              {isLoad ? <LoaderCircle className="animate-spin" /> : <QrCode />}
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}
