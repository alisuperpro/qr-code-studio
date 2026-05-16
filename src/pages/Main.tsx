import { Link } from 'wouter'
import { QrCode, Zap, Globe, Mail, MessageSquare, Wifi, Smartphone } from 'lucide-react'

export const Main = () => {
  const qrTypes = [
    {
      id: 'url',
      name: 'URL',
      description: 'Generate QR codes for websites and links',
      icon: Globe,
      path: '/studio/'
    },
    {
      id: 'text',
      name: 'Text',
      description: 'Encode plain text into QR codes',
      icon: QrCode,
      path: '/studio/text'
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Create QR codes for email addresses',
      icon: Mail,
      path: '/studio/email'
    },
    {
      id: 'phone',
      name: 'Phone',
      description: 'Generate QR codes for phone numbers',
      icon: Smartphone,
      path: '/studio/number-phone'
    },
    {
      id: 'sms',
      name: 'SMS',
      description: 'Create QR codes for text messages',
      icon: MessageSquare,
      path: '/studio/sms'
    },
    {
      id: 'wifi',
      name: 'WiFi',
      description: 'Generate QR codes for network access',
      icon: Wifi,
      path: '/studio/wifi'
    }
  ]

  return (
    <main className="w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <QrCode className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">QR Code Studio</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create QR Codes Instantly
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate professional QR codes for any type of content. From URLs and text to WiFi networks and contact information.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/studio/" asChild>
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Start Creating
              </button>
            </Link>
            <Link href="#features" asChild>
              <button className="px-8 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors">
                Learn More
              </button>
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="w-full h-64 md:h-80 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl border border-border flex items-center justify-center">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <QrCode className="w-20 h-20 md:w-32 md:h-32 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-4 py-16 md:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Multiple QR Code Types
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create QR codes for any purpose. Select from our variety of QR code types below.
            </p>
          </div>

          {/* QR Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qrTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Link key={type.id} href={type.path} asChild>
                  <div className="group cursor-pointer p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {type.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Create <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast & Easy</h3>
              <p className="text-sm text-muted-foreground">
                Create QR codes in seconds with our intuitive interface
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Support for URLs, text, email, phone, SMS, and WiFi
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Always Available</h3>
              <p className="text-sm text-muted-foreground">
                Works offline and syncs seamlessly across devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start generating QR codes for your needs right now
          </p>
          <Link href="/studio/" asChild>
            <button className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Create Your First QR Code
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
