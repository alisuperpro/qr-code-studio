import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { SelectExt } from '@/components/SelectExt'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { exists } from '@tauri-apps/plugin-fs'
import * as path from '@tauri-apps/api/path'
import { LoaderCircle, QrCode } from 'lucide-react'

export const Main = () => {
  const [name, setName] = useState('QR')
  const [url, setURL] = useState('')
  const [ext, setExt] = useState('.png')
  const [isLoad, setIsLoad] = useState(false)
  const { toast } = useToast()

  const createQR = async (name: string, url: string) => {
    const directory = await findDirectory()
    setIsLoad(true)

    const fileName = `${name}${ext}`

    if (directory === null) {
      setIsLoad(false)
      toast({
        title: 'Error',
        description: `Carpeta no seleccionada (${directory})`,
        duration: 2000,
      })
      setIsLoad(false)
      return
    }

    const filePath = await path.join(directory, fileName)
    const isExistFileInPath = await isExistFile(filePath)

    if (isExistFileInPath === false) {
      const result = await invoke('create_qr', {
        name: fileName,
        qrContent: url,
        path: `${directory}/`,
      })

      if (result === null) {
        toast({
          title: 'QR Creado',
          description: `El QR ha sido creado con exito.`,
          duration: 2000,
        })
      }
    } else {
      const id = Math.floor(Math.random() * 1000)
      const rename = fileName.replace(name, `${name}-${id}`)
      const result = await invoke('create_qr', {
        name: rename,
        qrContent: url,
        path: `${directory}/`,
      })

      if (result === null) {
        toast({
          title: 'QR Creado',
          description: `El QR ha sido creado con exito.`,
          duration: 2000,
        })
      }
    }
    setIsLoad(false)
  }

  const isExistFile = async (path: string) => {
    const isExist = await exists(path)

    return isExist
  }

  const findDirectory = async () => {
    const file = await open({
      multiple: false,
      directory: true,
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
                required={true}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />
              <SelectExt
                onValueChange={async (value) => setExt(value)}
                value={ext}
                required={true}
              />
            </div>

            <Input
              required={true}
              placeholder="URL"
              onChange={(event) => setURL(event.target.value)}
              value={url}
            />
            <Button disabled={isLoad}>
              Crear{' '}
              {isLoad ? <LoaderCircle className="animate-spin" /> : <QrCode />}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
