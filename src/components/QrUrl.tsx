import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { exists } from '@tauri-apps/plugin-fs'
import { ClipboardPaste, LoaderCircle, QrCode } from 'lucide-react'
import { save, open } from '@tauri-apps/plugin-dialog'
import { Label } from './ui/label'
import { readText } from '@tauri-apps/plugin-clipboard-manager'

export const QrUrl = () => {
  const [url, setURL] = useState('')
  const [customImage, setCustomImage] = useState<String | null>(null)
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
      console.log({ customImage })
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
        console.log(result)
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

  const selectLogo = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: 'Image',
          extensions: ['png', 'jpeg'],
        },
      ],
    })
    console.log(selected)

    return selected
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

  const selectCustomImage = async (event: any) => {
    event.preventDefault()
    const file = await selectLogo()

    setCustomImage(file)
  }

  const submitQR = async (event: any) => {
    event.preventDefault()
    createQR(url)
  }

  const pasteText = async () => {
    const clipboardText = await readText()

    return clipboardText
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
