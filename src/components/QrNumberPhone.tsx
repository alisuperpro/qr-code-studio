import { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useQrStore } from '@/store/qrStore'

export const QrNumberPhone = () => {
  const [tel, setTel] = useState('')
  const setContent = useQrStore((state) => state.setContent)

  const handlerTel = (value: string) => {
    setTel(value)
    setContent(`tel:${value}`)
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex w-full flex-col gap-y-2 px-8">
        <Label htmlFor="number-phone">Numero de Telefono</Label>
        <Input
          type="tel"
          id="number-phone"
          placeholder="+100000"
          value={tel}
          onChange={(event) => handlerTel(event.target.value)}
        />
      </div>
    </section>
  )
}
