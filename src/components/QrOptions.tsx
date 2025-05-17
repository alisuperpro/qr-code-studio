import { Link, useLocation } from 'wouter'
import { Button } from './ui/button'
import { LinkIcon, Type } from 'lucide-react'

export const QrOptions = () => {
  const [location, navigate] = useLocation()
  console.log({ location })
  return (
    <section className="px-4 py-4 w-full flex justify-center items-center gap-x-4">
      <Link href="/studio/">
        <QrOption icon={<LinkIcon />} text="Web" />
      </Link>
      <Link href="~/studio/text">
        <QrOption icon={<Type />} text="Texto" />
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
