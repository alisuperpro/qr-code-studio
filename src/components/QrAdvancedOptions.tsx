import { useFileStore } from '@/store/fileStore'
import { Button } from './ui/button'
import { useDialog } from '@/hooks/useDialog'
import { Label } from './ui/label'
import { Image } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useQrStore } from '@/store/qrStore'
import { Slider } from './ui/slider'
import { useState } from 'react'
import { Input } from './ui/input'

export const QrAdvancedOptions = () => {
  const customImage = useFileStore((state) => state.customImage)
  const setCustomImage = useFileStore((state) => state.setCustomImage)
  const { selectLogo } = useDialog()
  const setLevel = useQrStore((state) => state.setLevel)
  const level = useQrStore((state) => state.level)
  const setVersion = useQrStore((state) => state.setVersion)
  const [version, setQrVersion] = useState([0])
  const qrImageSize = useFileStore((state) => state.qrImageSize)
  const logoSize = useFileStore((state) => state.logoSize)
  const setLogoSize = useFileStore((state) => state.setLogoSize)
  const setQrImageSize = useFileStore((state) => state.setQrImageSize)

  const selectCustomImage = async (event: any) => {
    event.preventDefault()
    const file = await selectLogo()
    setCustomImage({ customImage: file })
    setQrVersion([5])
    setVersion(5)
  }

  const handlerVersion = (value: number[]) => {
    const data = value[0]
    setVersion(data)
    setQrVersion(value)
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
      <div>
        <Label>Seleccione un nivel de correccion</Label>
        <Select onValueChange={setLevel} value={level}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Nivel de correccion de error" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Baja (7%)</SelectItem>
            <SelectItem value="M">Media (15%)</SelectItem>
            <SelectItem value="Q">Alta (25%)</SelectItem>
            <SelectItem value="H">Muy Alta (30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full flex-col gap-y-2 py-4">
        <Label>Version del Qr</Label>
        <div className="flex flex-row gap-x-2 ">
          <Slider
            className="w-[250px]"
            defaultValue={[1]}
            max={40}
            step={1}
            value={version}
            onValueChange={handlerVersion}
          />
          <Label>{version}</Label>
        </div>
      </div>
      <div className="flex w-full gap-y-2 flex-col">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="qrImageSize">Tamaño del Qr</Label>
          <div className="flex flex-row justify-start items-center w-full gap-x-2">
            <Input
              type="number"
              id="qrImageSize"
              placeholder="Tamaño del Qr"
              value={qrImageSize}
              onChange={(event) => setQrImageSize(Number(event.target.value))}
              className="w-20"
            />
            <p className="font-bold text-md">px</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="logoSize">Tamaño del logo</Label>
          <div className="flex flex-row justify-start items-center w-full gap-x-2">
            <Input
              type="number"
              id="logoSize"
              placeholder="Tamaño del logo"
              value={logoSize}
              onChange={(event) => setLogoSize(Number(event.target.value))}
              className="w-20"
            />
            <p className="font-bold text-md">px</p>
          </div>
        </div>
      </div>
    </div>
  )
}
