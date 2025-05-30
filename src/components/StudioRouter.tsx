import { Route, Router } from 'wouter'
import { QrUrl } from './QrUrl'
import { QrText } from './QrText'
import { QrEmail } from './QrEmail'
import { QrNumberPhone } from './QrNumberPhone'
import { QrSms } from './QrSms'
import { QrWifi } from './QrWifi'

export const StudioRouter = () => {
  return (
    <>
      <Router base="/studio">
        <Route path="/" component={QrUrl} />
        <Route path="/text" component={QrText} />
        <Route path="/email" component={QrEmail} />
        <Route path="/number-phone" component={QrNumberPhone} />
        <Route path="/sms" component={QrSms} />
        <Route path="/wifi" component={QrWifi} />
      </Router>
    </>
  )
}
