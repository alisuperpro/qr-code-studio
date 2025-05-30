import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useQrStore } from '@/store/qrStore'
import { textToUrl } from '@/utils/functions'

export const QrSms = () => {
  const [tel, setTel] = useState('')
  const [body, setBody] = useState('')
  const setContent = useQrStore((state) => state.setContent)

  useEffect(() => {
    if (tel.length >= 1) {
      setContent(`sms:${tel}?body=${textToUrl(body)}`)
    }
  }, [tel, body])

  return (
    <section className="w-full h-full flex justify-center items-center flex-col gap-y-2 px-8">
      <div className="w-full flex flex-col gap-y-2">
        <Label>Numero de telefono</Label>
        <Input
          type="tel"
          placeholder="+100000"
          value={tel}
          onChange={(event) => setTel(event.target.value)}
        />
      </div>
      <div className="w-full">
        <textarea
          className="textarea-sizing w-60 max-w-60 h-40 max-h-40 resize-none px-2 py-2 outline-1 border rounded-sm border-black"
          onChange={(event) => setBody(event.target.value)}
          value={body}
        ></textarea>
      </div>
    </section>
  )
}
