import { Link } from 'wouter'
import { Button } from './ui/button'
import { LinkIcon, Mail, Type } from 'lucide-react'

export const QrOptions = () => {
  return (
    <section className="px-4 py-4 w-full flex justify-center items-center gap-x-4">
      <Link href="/studio/">
        <QrOption icon={<LinkIcon />} text="Web" />
      </Link>
      <Link href="/studio/text">
        <QrOption icon={<Type />} text="Texto" />
      </Link>
      <Link href="/studio/email">
        <QrOption icon={<Mail />} text="Email" />
      </Link>
    </section>
  )
}

export const QrOption = ({ icon, text }: { icon: any; text: string }) => {
  return (
    <Button variant="default">
      {icon} {text}
    </Button>
  )
}
