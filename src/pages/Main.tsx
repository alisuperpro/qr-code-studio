import { Link } from 'wouter'
import { QrCode, Globe, Mail, MessageSquare, Wifi, Smartphone, ArrowRight } from 'lucide-react'

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
    <main className="w-full h-screen bg-background flex flex-col overflow-hidden pb-20 relative">
      {/* Animated Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Column - Hero Section */}
        <section className="flex-1 px-12 py-8 border-r border-border/40 flex flex-col justify-center relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-30"></div>
          
          <div className="max-w-md space-y-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-block">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/20 border border-primary/40 px-3 py-1.5 rounded-full hover:bg-primary/30 transition-colors cursor-default">✨ Generador de Códigos QR</span>
              </div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 leading-tight">
                QR Code<br/>Studio
              </h1>
            </div>
            
            <p className="text-base text-muted-foreground leading-relaxed">
              Crea códigos QR profesionales en segundos. Todo procesado localmente, seguro y sin conexión requerida.
            </p>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/60 group-hover:scale-150 transition-transform"></div>
                <span className="font-medium">URLs, texto, contactos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/60 group-hover:scale-150 transition-transform"></div>
                <span className="font-medium">Teléfono, SMS y WiFi</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-default">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/60 group-hover:scale-150 transition-transform"></div>
                <span className="font-medium">Sin límites de uso</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column - Quick Actions */}
        <section className="flex-1 px-12 py-8 flex flex-col justify-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-foreground mb-2">
                Empezar
              </h2>
              <p className="text-sm text-muted-foreground">
                Elige el tipo de contenido
              </p>
            </div>

            {/* QR Type Grid - 2x3 */}
            <div className="grid grid-cols-3 gap-4">
              {qrTypes.map((type, index) => {
                const IconComponent = type.icon
                return (
                  <Link key={type.id} href={type.path} asChild>
                    <div 
                      className="group relative cursor-pointer p-5 bg-gradient-to-br from-card to-card/60 border border-primary/30 hover:border-primary/80 rounded-xl transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 active:scale-95 overflow-hidden"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      
                      <div className="relative z-10 p-3 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg group-hover:from-primary/50 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                        <IconComponent className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                          {type.name}
                        </h3>
                      </div>
                      <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* CTA Info Box */}
            <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-primary">Rápido & Confiable</span> — Genera códigos QR de alta calidad sin registrarse.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
