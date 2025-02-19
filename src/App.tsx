import { Main } from '@/pages/Main'
import { SettingsPage } from '@/pages/Settings'
import { Link, Route, Switch } from 'wouter'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'

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

export const Footer = () => {
  return (
    <footer className="w-full py-4 px-2 flex justify-center items-center">
      <div className="flex flex-row gap-x-4 bg-stone-900 px-6 py-3 rounded-md">
        <Button size="icon" variant="secondary">
          <Link href="/">
            <HomeIcon />
          </Link>
        </Button>
        {/* <Button size="icon" variant="secondary">
              <Link href="/settings">
                <Settings />
              </Link>
            </Button> */}
      </div>
    </footer>
  )
}

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </>
  )
}
export default App
