import { Link } from 'wouter'
import { Button } from './ui/button'
import { HomeIcon, QrCode } from 'lucide-react'

export const Footer = () => {
  // @ts-ignore define in dts
  const options: [
    {
      icon: any
      size?: 'icon' | 'default' | 'sm' | 'lg' | null | undefined
      variant?:
        | 'default'
        | 'secondary'
        | 'link'
        | 'destructive'
        | 'outline'
        | 'ghost'
        | null
        | undefined
      link: string
      id: string
    },
  ] = [
    {
      icon: HomeIcon,
      size: 'icon',
      variant: 'secondary',
      link: '/',
      id: 'home',
    },
    {
      icon: QrCode,
      size: 'icon',
      variant: 'secondary',
      link: '/studio/',
      id: 'studio',
    },
  ]

  return (
    <footer className="w-full py-4 px-2 flex justify-center items-center">
      <div className="flex flex-row gap-x-4 bg-stone-900 px-6 py-3 rounded-md">
        {options.map((opt) => {
          const Icon = opt.icon
          return (
            <Link href={opt.link} key={opt.id}>
              <Button size={opt.size} variant={opt.variant}>
                <Icon />
              </Button>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}
