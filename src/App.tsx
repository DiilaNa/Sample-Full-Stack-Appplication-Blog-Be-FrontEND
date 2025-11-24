import './App.css'
import { AuthProvide } from './context/authContext'
import Router from './Routes'

function App() {
  return (
    <AuthProvide>
      <Router />
    </AuthProvide>
  )
}

export default App
