import { useFileStore } from '@/store/fileStore'
import { Button } from './ui/button'
import { useDialog } from '@/hooks/useDialog'
import { Label } from './ui/label'
import { Image } from 'lucide-react'

export const QrAdvancedOptions = () => {
  const customImage = useFileStore((state) => state.customImage)
  const setCustomImage = useFileStore((state) => state.setCustomImage)
  const { selectLogo } = useDialog()

  const selectCustomImage = async (event: any) => {
    event.preventDefault()
    const file = await selectLogo()

    setCustomImage({ customImage: file })
  }
  return (
    <div className="flex justify-start items-start w-full flex-col gap-y-2 mt-4">
      <h3 className="font-bold text-md">Opciones Avanzadas</h3>
      <div className="w-full flex flex-row gap-x-2 justify-start items-center">
        <Button onClick={selectCustomImage}>
          {' '}
          <Image /> Elegir Imagen
        </Button>
        {customImage && <Label>{customImage}</Label>}
      </div>
    </div>
  )
}
