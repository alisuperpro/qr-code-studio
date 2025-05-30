import { Link } from 'wouter'
import { Button } from './ui/button'
import { LinkIcon, Mail, MessageSquareMore, Phone, Type } from 'lucide-react'

export const QrOptions = () => {
  const options = [
    {
      text: 'Web',
      href: '/studio/',
      icon: LinkIcon,
    },
    {
      text: 'Text',
      href: '/studio/text',
      icon: Type,
    },
    {
      text: 'Email',
      href: '/studio/email',
      icon: Mail,
    },
    {
      text: 'Numero de telefono',
      href: '/studio/number-phone',
      icon: Phone,
    },
    {
      text: 'SMS',
      href: '/studio/sms',
      icon: MessageSquareMore,
    },
  ]
  return (
    <section className="px-4 py-4 w-full flex justify-center items-center gap-x-4">
      {options.map(({ text, href, icon }) => {
        const Icon = icon
        return (
          <Link href={href}>
            <QrOption icon={<Icon />} text={text} />
          </Link>
        )
      })}
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
