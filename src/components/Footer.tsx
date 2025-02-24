import { Link } from 'wouter'
import { Button } from './ui/button'
import { HomeIcon, QrCode } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="w-full py-4 px-2 flex justify-center items-center">
      <div className="flex flex-row gap-x-4 bg-stone-900 px-6 py-3 rounded-md">
        <Link href="/">
          <Button size="icon" variant="secondary">
            <HomeIcon />
          </Button>
        </Link>

        <Link href="/qr-options">
          <Button size="icon" variant="secondary">
            <QrCode />
          </Button>
        </Link>
      </div>
    </footer>
  )
}
