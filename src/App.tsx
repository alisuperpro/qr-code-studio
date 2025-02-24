import { Main } from '@/pages/Main'
import { SettingsPage } from '@/pages/Settings'
import { Route, Switch } from 'wouter'
import { QrOptions } from './pages/QrOptions'
import { QrUrl } from '@/components/QrUrl'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <div className="flex flex-1">
          <Router />
        </div>
        <Footer />
      </div>
    </>
  )
}

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/qr-options" component={QrOptions} />
        <Route path="/qr-url" component={QrUrl} />
      </Switch>
    </>
  )
}
export default App
