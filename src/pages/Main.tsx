import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { exists } from '@tauri-apps/plugin-fs'
import { LoaderCircle, QrCode } from 'lucide-react'
import { save } from '@tauri-apps/plugin-dialog'

export const Main = () => {
  const [url, setURL] = useState('')
  const [isLoad, setIsLoad] = useState(false)
  const { toast } = useToast()

  const createQR = async (url: string) => {
    const file = await saveFile()
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
      /* const id = Math.floor(Math.random() * 1000)
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
      } */
    }
    setIsLoad(false)
  }

  const saveFile = async () => {
    const filePath = await save({
      filters: [
        {
          name: 'Image',
          extensions: ['png', 'jpeg'],
        },
      ],
    })

    console.log(filePath)
    return filePath
  }
  const isExistFile = async (path: string) => {
    const isExist = await exists(path)

    return isExist
  }

  /* const findDirectory = async () => {
    const file = await open({
      multiple: false,
      directory: true,
      canCreateDirectories: true,
    })

    return file
  } */

  const submitQR = async (event: any) => {
    event.preventDefault()
    createQR(url)
  }

  return (
    <main className="w-screen h-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-52">
          <img src="/cm.png" alt="" />
        </div>
        <div>
          <form className="" onSubmit={submitQR}>
            <div className="flex justify-center items-center flex-col gap-y-2 w-72">
              <Input
                required={true}
                placeholder="URL"
                onChange={(event) => setURL(event.target.value)}
                value={url}
              />
              <Button disabled={isLoad} className="w-full">
                Crear{' '}
                {isLoad ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <QrCode />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
