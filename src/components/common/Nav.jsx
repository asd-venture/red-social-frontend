import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'
import '../../styles/nav.css'

const Nav = () => {

    const { user } = useAuth0()

    return (
        <nav>
            <div>
                <img src={user.picture} onError={event=>{
                        event.target.src = "../../assets/perfilDefault.webp"
                        event.onerror = null
                    }} 
                />
                <p> {user.name} </p>
            </div>

            <div>
                <NavLink to='/home' activeclassname='active'>
                    Home
                </NavLink>
                <NavLink to='/Profile' activeclassname='active'>
                    Profile
                </NavLink>
            </div>

            <div>
                <LogoutButton/>
            </div>
        </nav>
    )
}

export default Nav