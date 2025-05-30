import { Main } from '@/pages/Main'
import { SettingsPage } from '@/pages/Settings'
import { Route, Switch } from 'wouter'
import { Footer } from '@/components/Footer'
import { Studio } from './pages/Studio'

function App() {
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-screen">
          <Router />
        </div>
        <div className="w-min h-min absolute bottom-5 right-[45%]">
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
