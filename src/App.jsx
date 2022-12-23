import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from './pages'
import Home from './pages/Home'
import Load from './components/Load'
import Profile from './pages/Profile'
import Error404 from './components/Error404'
import './App.css'

function App() {

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className='appLoad'><Load/></div>
  
  return (
    <Router>
      { 
        isAuthenticated ?
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile/:email' element={<Profile/>} />
            <Route path='*' element={<Error404/>}/>
          </Routes>
              :
          <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path='*' element={<Error404/>}/>
          </Routes>
      }
    </Router>
  )
}

export default App
