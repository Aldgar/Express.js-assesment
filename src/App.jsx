import './App.css'
import SignUpPage from './Pages/SignUpPage'
import SignInPage from './Pages/SingInPage'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/signup' element={<SignUpPage />}/>
    <Route path='/signin' element={<SignInPage />}/>
   </Routes>
    </>
  )
}

export default App
