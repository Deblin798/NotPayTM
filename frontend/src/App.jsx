import DashBoard from './pages/DashBoard'
import Error from './pages/Error'
import Send from './pages/Send'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/dashboard' element={<DashBoard />}/>
        <Route path='/send' element={token? <Send />: <Error />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
