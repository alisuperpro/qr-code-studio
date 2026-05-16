import { Link } from 'wouter'
import { QrCode, Globe, Mail, MessageSquare, Wifi, Smartphone } from 'lucide-react'

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
      name: 'Texto',
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
      name: 'Teléfono',
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

  return (
    <main className="w-full h-screen bg-background flex flex-col overflow-hidden pb-20">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Information */}
        <section className="flex-1 px-8 py-6 border-r border-border flex flex-col justify-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Código QR
            </h2>
            
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Código de barras bidimensional que almacena información. Escanéable con cualquier dispositivo móvil.
            </p>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">URLs • Texto • Contactos • Teléfono • SMS • WiFi</p>
              <p className="text-xs text-muted-foreground">Generado localmente sin conexión</p>
            </div>
          </div>
        </section>

        {/* Right Column - Quick Actions */}
        <section className="flex-1 px-8 py-6 flex flex-col justify-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Crear QR
            </h2>

            {/* QR Type Grid */}
            <div className="grid grid-cols-3 gap-3">
              {qrTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <Link key={type.id} href={type.path} asChild>
                    <div className="group cursor-pointer p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center gap-2">
                      <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="text-xs font-medium text-foreground">
                        {type.name}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
