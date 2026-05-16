import { Link } from 'wouter'
import { QrCode, Globe, Mail, MessageSquare, Wifi, Smartphone, Scan, Copy, Download, Lock } from 'lucide-react'

export const Main = () => {
  const qrTypes = [
    {
      id: 'url',
      name: 'URL',
      icon: Globe,
      path: '/studio/'
    },
    {
      id: 'text',
      name: 'Text',
      icon: QrCode,
      path: '/studio/text'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      path: '/studio/email'
    },
    {
      id: 'phone',
      name: 'Phone',
      icon: Smartphone,
      path: '/studio/number-phone'
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: MessageSquare,
      path: '/studio/sms'
    },
    {
      id: 'wifi',
      name: 'WiFi',
      icon: Wifi,
      path: '/studio/wifi'
    }
  ]

  const qrFeatures = [
    {
      icon: Scan,
      title: 'Fácil de escanear',
      description: 'Los códigos QR se pueden escanear con cualquier dispositivo móvil'
    },
    {
      icon: Copy,
      title: 'Múltiples usos',
      description: 'Funciona para URLs, texto, contactos, WiFi y más'
    },
    {
      icon: Download,
      title: 'Descargable',
      description: 'Guarda tus códigos QR en alta resolución'
    },
    {
      icon: Lock,
      title: 'Seguro',
      description: 'Todo se procesa localmente en tu dispositivo'
    }
  ]

  return (
    <main className="w-full h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-2 px-6 py-3 border-b border-border flex-shrink-0">
        <QrCode className="w-5 h-5 text-primary" />
        <h1 className="text-base font-bold text-foreground">QR Code Studio</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Information */}
        <section className="flex-1 px-6 py-5 overflow-y-auto border-r border-border">
          <div className="max-w-sm">
            <h2 className="text-lg font-bold text-foreground mb-2">
              ¿Qué es un código QR?
            </h2>
            
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Un código QR es un código de barras bidimensional que almacena información como URLs, texto, contactos, números de teléfono, WiFi y más.
            </p>

            <div className="space-y-2.5 mb-4">
              <h3 className="font-semibold text-foreground text-xs">Características:</h3>
              {qrFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex gap-2">
                    <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-medium text-foreground">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground leading-tight">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded p-3">
              <p className="text-xs text-foreground leading-tight">
                <span className="font-semibold">Dato:</span> Inventados en 1994 por Denso Wave en Japón y pueden almacenar hasta 4,296 caracteres.
              </p>
            </div>
          </div>
        </section>

        {/* Right Column - Quick Actions */}
        <section className="flex-1 px-6 py-5 overflow-y-auto flex flex-col">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground mb-0.5">
              Crear código QR
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Selecciona el tipo de contenido
            </p>

            {/* QR Type Grid */}
            <div className="grid grid-cols-2 gap-3">
              {qrTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <Link key={type.id} href={type.path} asChild>
                    <div className="group cursor-pointer p-3 bg-card rounded border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 flex flex-col items-center justify-center text-center gap-1.5">
                      <div className="p-1.5 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-xs font-semibold text-foreground">
                        {type.name}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-4 flex-shrink-0">
            <div className="bg-primary/10 border border-primary/20 rounded p-3 space-y-1">
              <h4 className="text-xs font-semibold text-foreground">Rápido y simple</h4>
              <p className="text-xs text-muted-foreground leading-tight">
                Genera códigos QR personalizados en segundos sin conexión.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
