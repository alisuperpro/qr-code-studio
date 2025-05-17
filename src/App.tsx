import { Main } from '@/pages/Main'
import { SettingsPage } from '@/pages/Settings'
import { Route, Switch } from 'wouter'
import { Footer } from '@/components/Footer'
import { Studio } from './pages/Studio'

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <div className="flex flex-1 h-full">
          <Router />
        </div>
        <div className="h-min flex py-2">
          <Footer />
        </div>
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
        <Route path="/studio/*" component={Studio} />
      </Switch>
    </>
  )
}
export default App
