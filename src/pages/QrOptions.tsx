import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'wouter'

export const QrOptions = () => {
  return (
    <section className="px-4 py-8 w-full grid grid-cols-3 gap-x-4">
      <div className="row-span-1">
        <Link href="/qr-url">
          <QrOption
            title="QR URL"
            description={null}
            content={'Crear qr apartir de una url'}
            footer={null}
          />
        </Link>
      </div>
    </section>
  )
}

export const QrOption = ({
  title,
  description,
  content,
  footer,
}: {
  title: any
  description: any
  content: any
  footer: any
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  )
}
