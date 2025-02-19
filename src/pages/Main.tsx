import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { SelectExt } from '@/components/SelectExt'
import { QrIcon } from '@/icons/QrIcon'
import { LoaderIcon } from '@/icons/LoaderIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export const Main = () => {
  const [name, setName] = useState('QR')
  const [url, setURL] = useState('')
  const [ext, setExt] = useState('.png')
  const [isLoad, setIsLoad] = useState(false)
  const { toast } = useToast()

  const createQR = async (name: string, url: string) => {
    setIsLoad(true)
    const directory = await findDirectory()

    const fileName = `${name}${ext}`

    if (directory === null) {
      setIsLoad(false)
      toast({
        title: 'Error',
        description: `Carpeta no seleccionada (${directory})`,
        duration: 1000,
      })
      setIsLoad(false)
      return
    } else {
      await invoke('create_qr', {
        name: fileName,
        qrContent: url,
        path: `${directory}/`,
      })
    }
    setIsLoad(false)
  }

  const findDirectory = async () => {
    const file = await open({
      multiple: false,
      directory: false,
      canCreateDirectories: true,
    })

    return file
  }

  const submitQR = async (event: any) => {
    event.preventDefault()
    createQR(name, url)
  }

  return (
    <main className="w-screen h-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-52">
          <img src="/cm.png" alt="" />
        </div>
        <div>
          <form className="flex flex-col gap-y-2" onSubmit={submitQR}>
            <div className="w-full flex flex-row gap-x-2 justify-center items-center">
              <Input
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />
              <SelectExt
                onValueChange={async (value) => setExt(value)}
                value={ext}
              />
            </div>

            <Input
              placeholder="URL"
              onChange={(event) => setURL(event.target.value)}
              value={url}
            />
            <Button disabled={isLoad}>
              Crear{' '}
              {isLoad ? <LoaderIcon className="animate-spin" /> : <QrIcon />}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
