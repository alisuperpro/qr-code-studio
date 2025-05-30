import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useQrStore } from '@/store/qrStore'
import { textToUrl } from '@/utils/functions'

export const QrEmail = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const setContent = useQrStore((state) => state.setContent)

  useEffect(() => {
    const convert = `mailto:${email}?subject=${subject}&body=${body}`

    if (email.length >= 1) {
      setContent(convert)
    }
  }, [email, subject, body])

  const handleSubjectInput = (subject: string) => {
    const subjectUrl = textToUrl(subject)
    setSubject(subjectUrl)
  }

  const handleBodyInput = (body: string) => {
    const bodyUrl = textToUrl(body)
    setBody(bodyUrl)
  }
  return (
    <section className="flex flex-col justify-center items-center w-full gap-y-2 px-6 py-2 pt-16">
      <div className="w-full flex flex-row justify-center items-center gap-x-2 ">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className=" outline-1 border-[1px] rounded-sm border-black ml-3"
        />
      </div>

      <div className="w-full  flex flex-row justify-center items-center gap-x-2">
        <Label htmlFor="subject">Asunto</Label>
        <Input
          type="text"
          name="subject"
          id="subject"
          className=" outline-1 border-[1px] rounded-sm border-black"
          value={subject}
          onChange={(event) => handleSubjectInput(event.target.value)}
        />
      </div>
      <div className="w-full">
        <textarea
          name="body"
          className="w-full max-h-60 h-60 resize-none textarea-sizing shadow-md px-2 py-2  outline-1 border-[1px] rounded-sm border-black"
          value={body}
          onChange={(event) => handleBodyInput(event.target.value)}
        ></textarea>
      </div>
    </section>
  )
}
