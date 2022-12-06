import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from './pages'
import Home from './pages/Home'
import Loading from './components/Loading'
import Profile from './pages/Profile'
import Error404 from './components/Error404'
import './App.css'

function App() {

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading/>
  
  console.log(isAuthenticated)
  return (
    <Router>
      { 
        isAuthenticated ?
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile/:id' element={<Profile/>} />
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
