import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Loading from './components/Loading'
import Profile from './components/Profile'

function App() {

  const [users, setUsers] = useState(null);

  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();


  const url = "http://localhost:3000/users";
  useEffect(()=>{
    fetch(url)
    .then(response=> response.json())
    .then(json => {
      setUsers(json)
    })
    .catch(e => {
      console.log('e', e)
    })
  }, [])

  if (isLoading) return <Loading/>
  
  return (
    <Router>
      { 
        isAuthenticated ?
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
              :
          <Routes>
            <Route path='/' element={loginWithRedirect()}/>
          </Routes>
      }
    </Router>
  )
}

export default App
